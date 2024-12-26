import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Stack,
  Textarea,
  useToast,
  List,
  ListItem,
  Flex,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { useAuth } from '../../hooks/Auth';

export default function Forum() {
  const { user } = useAuth();
  const [topics, setTopics] = useState([]);
  const [user_public, setUser] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ content: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [hoveredTopic, setHoveredTopic] = useState(null); // Track the hovered topic
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      const fetchUser = async () => {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email);

        if (userError) {
          toast({
            title: 'Error fetching user data.',
            description: userError.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else if (userData.length) {
          setUser(userData[0]);
          if (userData[0].role === 'admin') {
            setIsAdmin(true);
          }
        }
      };
      fetchUser();
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
  }, [user, toast]);

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
        user_name: user_public.username,
      });

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
            topic_id: selectedTopic.topic_id,
            user_id: user_public.user_id,
            content: newPost.content,
            created_at: new Date().toISOString(),
            user_name: user_public.username,
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

  const handleAddTopic = async () => {
    if (newTopic) {
      const { data, error } = await supabase.from('forum_topics').insert({
        title: newTopic,
        created_at: new Date().toISOString(),
      });
  
      if (error) {
        toast({
          title: 'Error adding topic.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        if (Array.isArray(topics) && data !== null && data.length) {
          console.log('New Topic Data:', data);
          setTopics((prev) => [...prev, data[0]]);
        } else {
          console.error('Topics data is invalid:', topics);
        }
        setNewTopic('');
        toast({
          title: 'New Topic Added.',
          description: 'The new topic has been successfully added.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Missing Title',
        description: 'Please enter a title for the new topic.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
    window.location.reload();
  };

  const handleDeleteTopic = async (topic_id) => {
    const { data, error } = await supabase.from('forum_topics').delete().eq('topic_id', topic_id);

    if (error) {
      toast({
        title: 'Error deleting topic.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setTopics((prev) => prev.filter((topic) => topic.topic_id !== topic_id));
      toast({
        title: 'Topic Deleted.',
        description: 'The topic has been deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="1200px" minHeight="500px" margin="auto" padding={6} bg="gray.100" borderRadius="md">
      <Flex justifyContent="space-between" alignItems="center" marginBottom={6}>
        <Heading as="h1" size="2xl" textAlign="center" color="black" fontFamily="Arial, sans-serif">
          Fitness Forum
        </Heading>
        <Stack>
          {user_public && (
            <Text fontWeight={600} fontStyle="italic" color="gray.700">
              You're interacting as: {user_public.username || 'error'}
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

      <Flex flexDirection={{ base: 'column', md: 'row' }} gap={6}>
        <Box
          width={{ base: '100%', md: '30%' }}
          padding={5}
          border="1px solid #ddd"
          borderRadius="md"
          bg="white"
          boxShadow="xl"
        >
          <Heading as="h2" size="lg" marginBottom={4} color="blue.500">
            Topics
          </Heading>
          <List spacing={3}>
            {topics.map((topic) => (
              <ListItem
                key={topic.topic_id}
                onMouseEnter={() => setHoveredTopic(topic.topic_id)}
                onMouseLeave={() => setHoveredTopic(null)}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Button
                    onClick={() => handleTopicSelect(topic)}
                    variant="ghost"
                    justifyContent="flex-start"
                    width="90%"
                    textAlign="left"
                    _hover={{ color: 'green.500' }}
                  >
                    {topic.title}
                  </Button>
                  {isAdmin && hoveredTopic === topic.topic_id && (
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Delete Topic"
                      colorScheme="red"
                      onClick={() => handleDeleteTopic(topic.topic_id)}
                    />
                  )}
                </Flex>
              </ListItem>
            ))}
          </List>
          {isAdmin && (
            <>
              <Input
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Enter new topic title"
                marginTop={4}
                mb={2}
              />
              <Button
                onClick={handleAddTopic}
                colorScheme="blue"
                width="full"
              >
                Add New Topic
              </Button>
            </>
          )}
        </Box>

        <Box
          width={{ base: '100%', md: '70%' }}
          padding={5}
          border="1px solid #ddd"
          borderRadius="md"
          bg="white"
          boxShadow="xl"
        >
          {selectedTopic ? (
            <VStack align="stretch" spacing={6}>
              <Heading as="h2" size="lg" color="blue.500">
                {selectedTopic.title}
              </Heading>

              {/* Scrollable Posts Section */}
              <Box
                maxHeight="400px"  // Set max height to make it scrollable
                overflowY="auto"
                paddingRight={2}
              >
                {posts.map((post) => (
                  <Box
                    key={post.post_id}
                    borderWidth={1}
                    borderRadius="lg"
                    padding={4}
                    bg="white"
                    boxShadow="md"
                    mb={4}
                    transition="all 0.3s ease"
                    _hover={{ boxShadow: 'xl', bg: 'blue.50' }}
                  >
                    <Text fontWeight="bold" color="black">
                      {post.user_id === user_public.user_id ? 'You' : post.user_name}
                    </Text>
                    <Text>{post.content}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(post.created_at).toLocaleString()}
                    </Text>
                  </Box>
                ))}
              </Box>

              {/* New Post Section */}
              <Box as="form" onSubmit={handleNewPostSubmit}>
                <VStack spacing={4} align="stretch">
                  <Textarea
                    placeholder="Your message"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    required
                    bg="gray.50"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'blue.500' }}
                    _focus={{ borderColor: 'blue.500' }}
                  />
                  <Button type="submit" colorScheme="blue" width="full" borderRadius="md">
                    Post Reply
                  </Button>
                </VStack>
              </Box>
            </VStack>
          ) : (
            <Text color="gray.500">Select a topic to view the discussion.</Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
