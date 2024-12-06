import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Stack,
  Input,
  Textarea,
  useToast,
  List,
  ListItem,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { useAuth } from "../../hooks/Auth";


export default function Forum() {
  const { user } = useAuth(); // Use the Auth hook to check user state
  const [topics, setTopics] = useState([]);
  const [user_public, setUser] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ content: '' });
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      const doSomething = async () => {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email); // match by email
  
        if (userError) {
          toast({
            title: 'Error fetching user data.',
            description: userError.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          console.log('Fetched users:', userData);
          if (userData)
            setUser(userData[0]);
        }
      };
  
      doSomething();
    }
    
    const fetchTopics = async () => {
      const { data, error } = await supabase.from('forum_topics').select('*');
      if (error) {
        toast({
          title: 'Error fetching topics.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setTopics(data);
      }
    };
  
    fetchTopics();
  }, [user, toast]); // Run the effect again when 'user' changes
  
  
  
  const handleTopicSelect = async (topic) => {
    setSelectedTopic(topic);
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .eq('topic_id', topic.topic_id)
      .order('created_at', { ascending: true });

    if (error) {
      toast({
        title: 'Error fetching posts.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setPosts(data);
    }
  };

  

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
  
    if (!user_public || !user_public.user_id || !user_public.username) {
      toast({
        title: 'Error',
        description: 'User information is missing.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    if (selectedTopic && newPost.content) {
      const { data, error } = await supabase.from('forum_posts').insert({
        topic_id: selectedTopic.topic_id,
        user_id: user_public.user_id,
        content: newPost.content,
        created_at: new Date().toISOString(),
        user_name: user_public.username
      });
      console.log(data);
  
      if (error) {
        toast({
          title: 'Error submitting post.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setPosts((prev) => [
          ...prev,
          {
            //post_id: data[0].post_id,
            topic_id: selectedTopic.topic_id,
            user_id: user_public.user_id,
            content: newPost.content,
            created_at: new Date().toISOString(),
            user_name: user_public.username
          },
        ]);
  
        setNewPost({ content: '' });
  
        toast({
          title: 'Post submitted.',
          description: "We've added your post to the discussion.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Missing Information',
        description: 'Please make sure all fields are filled.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Box maxWidth="1200px" margin="auto" padding={4}>
      <Flex justifyContent="space-between" alignItems="center" marginBottom={6}>
        <Heading as="h1" size="2xl" textAlign="center">
          Fitness Forum
        </Heading>
        <Stack>
          {!user_public ? (
            <></>
          ) : (
            <Text fontWeight={600}>
              You're interact with name {user_public.username || 'error'} {/* Show user's email or name */}
            </Text>
          )}
        </Stack>
        <IconButton
          aria-label="Go back to Home"
          icon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          colorScheme="blue"
          variant="outline"
        />
      </Flex>

      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        gap={6}
        alignItems={{ base: 'stretch', md: 'flex-start' }}
      >
        <Box
          width={{ base: '100%', md: '30%' }}
          padding={4}
          border="1px solid #ddd"
          borderRadius="md"
          bg="gray.50"
        >
          <Heading as="h2" size="lg" marginBottom={4}>
            Topics
          </Heading>
          <List spacing={3}>
            {topics.map((topic) => (
              <ListItem key={topic.topic_id}>
                <Button
                  onClick={() => handleTopicSelect(topic)}
                  variant="ghost"
                  justifyContent="flex-start"
                  width="100%"
                  textAlign="left"
                >
                  {topic.title}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          width={{ base: '100%', md: '70%' }}
          padding={4}
          border="1px solid #ddd"
          borderRadius="md"
          bg="gray.50"
        >
          {selectedTopic ? (
            <VStack align="stretch" spacing={6}>
              <Heading as="h2" size="lg">
                {selectedTopic.title}
              </Heading>
              {posts.map((post) => (
                <Box
                  key={post.post_id}
                  borderWidth={1}
                  borderRadius="lg"
                  padding={4}
                  bg="white"
                  boxShadow="md"
                >
                  <Text fontWeight="bold">{post.user_id === user_public.user_id ? 'You' : post.user_name}</Text>
                  <Text>{post.content}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(post.created_at).toLocaleString()}
                  </Text>
                </Box>
              ))}
              <Box as="form" onSubmit={handleNewPostSubmit}>
                <VStack spacing={4} align="stretch">
                  <Textarea
                    placeholder="Your message"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    required
                  />
                  <Button type="submit" colorScheme="blue">
                    Post Reply
                  </Button>
                </VStack>
              </Box>
            </VStack>
          ) : (
            <Text>Select a topic to view the discussion.</Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
