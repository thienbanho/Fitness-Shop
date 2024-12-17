import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Textarea,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Select,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all"); // 'all' or 'images'

  const handleAddReview = () => {
    if (rating > 0 && comment) {
      const newReview = {
        id: reviews.length + 1,
        rating,
        comment,
        hasImage: Math.random() > 0.5, // Randomize if review includes an image
      };
      setReviews([newReview, ...reviews]);
      setComment("");
      setRating(0);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <Box mt="12" bg="gray.50" p="6" borderRadius="md" shadow="md">
      {/* Rating Summary */}
      <HStack align="start" mb="6">
        <Box>
          <Heading size="lg" mb="2">
            Product reviews
          </Heading>
          <Text fontSize="4xl" fontWeight="bold">
            {averageRating.toFixed(1)}
          </Text>
          <HStack spacing="1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Icon
                  key={i}
                  as={i < Math.round(averageRating) ? AiFillStar : AiOutlineStar}
                  color={i < Math.round(averageRating) ? "yellow.400" : "gray.400"}
                  boxSize="5"
                />
              ))}
          </HStack>
          <Text>{reviews.length} review(s)</Text>
        </Box>
      </HStack>

      {/* Tabs */}
      <Tabs variant="enclosed" onChange={(index) => setSelectedTab(index === 0 ? "all" : "images")}>
        <TabList>
          <Tab>All reviews ({reviews.length})</Tab>
          <Tab>
            Images ({reviews.filter((r) => r.hasImage).length})
          </Tab>
        </TabList>
        <TabPanels>
          {/* All Reviews Tab */}
          <TabPanel>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Box
                  key={review.id}
                  p="4"
                  mb="4"
                  borderWidth="1px"
                  borderRadius="md"
                  shadow="sm"
                >
                  <HStack>
                    <HStack spacing="1">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <Icon
                            key={i}
                            as={i < review.rating ? AiFillStar : AiOutlineStar}
                            color={i < review.rating ? "yellow.400" : "gray.400"}
                            boxSize="4"
                          />
                        ))}
                    </HStack>
                    <Text fontWeight="bold">{review.rating} / 5</Text>
                  </HStack>
                  <Text mt="2">{review.comment}</Text>
                </Box>
              ))
            ) : (
              <Text>No reviews yet.</Text>
            )}
          </TabPanel>

          {/* Reviews with Images Tab */}
          <TabPanel>
            {reviews.filter((r) => r.hasImage).length > 0 ? (
              reviews
                .filter((review) => review.hasImage)
                .map((review) => (
                  <Box
                    key={review.id}
                    p="4"
                    mb="4"
                    borderWidth="1px"
                    borderRadius="md"
                    shadow="sm"
                  >
                    <HStack>
                      <HStack spacing="1">
                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <Icon
                              key={i}
                              as={i < review.rating ? AiFillStar : AiOutlineStar}
                              color={i < review.rating ? "yellow.400" : "gray.400"}
                              boxSize="4"
                            />
                          ))}
                      </HStack>
                      <Text fontWeight="bold">{review.rating} / 5</Text>
                    </HStack>
                    <Text mt="2">{review.comment}</Text>
                  </Box>
                ))
            ) : (
              <Text>There are no images for reviews..</Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Sorting Options */}
      <HStack spacing="4" mt="6">
        <Select placeholder="Rating">
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </Select>
        <Select placeholder="Sort by">
          <option value="newest">Newest to oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </Select>
      </HStack>

      {/* Add Review Section */}
      <Box mt="8">
        <Heading size="md" mb="4">
          Submit Review
        </Heading>
        <VStack spacing="4" align="start">
          <HStack>
            <Text>Rating:</Text>
            <Slider
              aria-label="Rating Slider"
              defaultValue={0}
              width={150}
              min={0}
              max={5}
              step={1}
              value={rating}
              onChange={(val) => setRating(val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>{rating} / 5</Text>
          </HStack>
          <Textarea
            placeholder="Write Your Review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleAddReview}>
            Submit Review
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Reviews;
