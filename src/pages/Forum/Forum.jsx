'use client'

import React, { useState } from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  useToast,
  List,
  ListItem,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons' // Import the icon
import { useNavigate } from 'react-router-dom' // Import router for navigation
import { forumTopics } from './ForumData'

export default function Forum() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [newPost, setNewPost] = useState({ author: '', content: '' })
  const toast = useToast()
  const navigate = useNavigate() // Use navigate for routing

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic)
  }

  const handleNewPostSubmit = (e) => {
    e.preventDefault()
    if (selectedTopic && newPost.author && newPost.content) {
      const updatedTopic = {
        ...selectedTopic,
        posts: [
          ...selectedTopic.posts,
          {
            id: (selectedTopic.posts.length + 1).toString(),
            ...newPost,
            timestamp: new Date().toISOString(),
          },
        ],
      }
      setSelectedTopic(updatedTopic)
      setNewPost({ author: '', content: '' })
      toast({
        title: 'Post submitted.',
        description: "We've added your post to the discussion.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box maxWidth="1200px" margin="auto" padding={4}>
      <Flex justifyContent="space-between" alignItems="center" marginBottom={6}>
        {/* Heading */}
        <Heading as="h1" size="2xl" textAlign="center">
          Fitness Forum
        </Heading>
        {/* Exit Button */}
        <IconButton
          aria-label="Go back to Home"
          icon={<ArrowBackIcon />} // Icon for the button
          onClick={() => navigate('/')} // Navigate to Home
          colorScheme="blue"
          variant="outline"
        />
      </Flex>

      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        gap={6}
        alignItems={{ base: 'stretch', md: 'flex-start' }}
      >
        {/* Topics Section */}
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
            {forumTopics.map((topic) => (
              <ListItem key={topic.id}>
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

        {/* Posts Section */}
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
              {selectedTopic.posts.map((post) => (
                <Box
                  key={post.id}
                  borderWidth={1}
                  borderRadius="lg"
                  padding={4}
                  bg="white"
                  boxShadow="md"
                >
                  <Text fontWeight="bold">{post.author}</Text>
                  <Text>{post.content}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(post.timestamp).toLocaleString()}
                  </Text>
                </Box>
              ))}
              <Box as="form" onSubmit={handleNewPostSubmit}>
                <VStack spacing={4} align="stretch">
                  <Input
                    placeholder="Your name"
                    value={newPost.author}
                    onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                    required
                  />
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
  )
}
