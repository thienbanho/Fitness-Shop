//!! Người dùng cần nhập thông tin ở profile user trước mới được vào đây

import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  Text,
  Container,
  UnorderedList,
  ListItem,
  Flex,
  Textarea,
  Select,
  Avatar,
} from "@chakra-ui/react";

import Navbar from "../../components/NavBar/NavBar"; // Navbar đã có sẵn
import Sidebar from "../../components/Sidebar/Sidebar"; // Sidebar đã có sẵn
import Footer from "../../components/Footer/Footer"; // Footer đã có sẵn
import supabase from '../../config/supabaseClient';

export default function PTRegistration() {
  const [formData, setFormData] = useState({
    //fullName: "", Người dùng cần nhập thông tin ở profile user trước mới được vào đây
    //phone: "",
    introduction: "",
    specialization: "",
    workLocation: "",
    personalPage: "",
    priceStart: "",
    priceEnd:""
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    console.log("Uploaded Image:", image);
    alert("Registration Submitted Successfully!");
  };

  return (
    <Flex direction="column" minHeight="100vh">
      {/* Navbar */}
      <Box as="header" width="100%" position="fixed" top="0" zIndex="10">
        <Navbar />
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={40}>
        <Flex gap={8}>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Form */}
          <Box flex={1} bg="white" p={8} borderRadius="md" shadow="sm">
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
              Personal Trainer Registration
            </Text>

            <VStack spacing={4} align="stretch">

              <FormControl>
                <FormLabel>Introduction</FormLabel>
                <Textarea
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleInputChange}
                  placeholder="Briefly introduce yourself"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Specialization</FormLabel>
                <Textarea
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  placeholder="Your specialization as a trainer"
                />
              </FormControl>

              <FormControl>
              <FormLabel>Price Range per Session</FormLabel>
              <HStack spacing={4}>
                <Input
                  name="priceStart"
                  type="number"
                  value={formData.priceStart}
                  onChange={handleInputChange}
                  placeholder="Start Price (VND)"
                />
                <Text>-</Text>
                <Input
                  name="priceEnd"
                  type="number"
                  value={formData.priceEnd}
                  onChange={handleInputChange}
                  placeholder="End Price (VND)"
                />
              </HStack>
            </FormControl>

              <FormControl>
                <FormLabel>Work Location</FormLabel>
                <Input
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleInputChange}
                  placeholder="Enter your work location (e.g., HCM, Hanoi)"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Personal Page Link</FormLabel>
                <Input
                  name="personalPage"
                  type="url"
                  value={formData.personalPage}
                  onChange={handleInputChange}
                  placeholder="Enter your personal page link (e.g., Facebook, LinkedIn)"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Upload Profile Picture (Work Relative)</FormLabel>
                <HStack>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {image && <Avatar src={image} size="xl" />}
                </HStack>
              </FormControl>

              <Box>
                {/* Policies Section */}
                <Box mb={6}>
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    Personal Training Program policies:
                  </Text>
                  <UnorderedList>
                    <ListItem>
                      Each participant must sign a waiver and complete a health
                      history questionnaire to be kept on file and will be
                      confidential between the personal trainer and the client.
                    </ListItem>
                    <ListItem>
                      Participants must make appointments with at least 48 hours
                      in advance or by 5:00pm on Fridays for Monday sessions.
                    </ListItem>
                    <ListItem>
                      Mary Catherine must be notified 24 hours in advance for
                      cancellations; if notification is not at least 24 hours in
                      advance or the session is missed the participant will be
                      charged for the session.
                    </ListItem>
                    <ListItem>
                      Participants 15 minutes late or more to a session will be
                      charged for the session and lose the training for the
                      entire session.
                    </ListItem>
                    <ListItem>
                      Clients are to meet the personal trainer at the agreed
                      upon training venue at the scheduled appointment time,
                      unless an alternate meeting place as been agreed upon
                      between client and the personal trainer.
                    </ListItem>
                  </UnorderedList>
                </Box>

                {/* Assumption of Risk Section */}
                <Box mb={6}>
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    Assumption of Risk for Participation in the Personal
                    Training Program:
                  </Text>
                  <Text>
                    Each participant in the Personal Training Program should
                    realize that there are substantial risks, hazards, and
                    danger inherent in such training.{" "}
                    <strong>
                      Each participant in the Personal Training Program must be
                      covered by an accident and health insurance policy.
                    </strong>{" "}
                    It is the responsibility of each participant to participate
                    only in those activities for which he/she has the
                    prerequisite skills, qualifications, preparation, and
                    training (as determined and instructed by the personal
                    trainer). Mary Catherine does not warrant or guarantee in
                    any respect the physical condition or any equipment used in
                    connection with the activity.
                  </Text>
                  <Text mt={2}>
                    Therefore, in consideration of the benefits received from
                    the personal training program, the undersigned{" "}
                    <strong>
                      assumes all risks of damages or injury, including death,
                    </strong>{" "}
                    that may be sustained by him/her while participating in an
                    exercise activity or in travel to or from such activity.
                  </Text>
                </Box>

                {/* Waiver Section */}
                <Box mb={6}>
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    Release, Covenant Not to Sue, and Waiver:
                  </Text>
                  <Text>
                    Personal Training involves an inherent risk of physical
                    injury and the undersigned assumes all such risks. The
                    undersigned hereby agrees that for the sole consideration of
                    Mary Catherine Domaleski allowing the undersigned to
                    participate in the Personal Training Program for which or in
                    connection with Mary Catherine Domaleski has made available
                    any equipment, facilities, grounds, or personnel for such
                    training, the undersigned does hereby release, covenant not
                    to sue, and forever discharge Mary Catherine Domaleski and
                    her officers, agents, and employees of any and for all
                    claims, demands, rights, and causes of action of whatever
                    kind or nature including but not limited to negligence,
                    unforeseen bodily and personal injuries, damage to property,
                    and the consequences thereof from participation in any way
                    connected with such recreational programs and activities.
                    The undersigned understands that this Release, Covenant Not
                    to Sue, Waiver, and Assumption of Risk shall be effective
                    from the date of signature until the effective termination
                    of the personal training services agreement by Mary
                    Catherine Domaleski. By signing this document, the
                    undersigned hereby acknowledges that he/she has read the
                    above carefully before signing and agrees to comply with all
                    the above.
                  </Text>
                </Box>
              </Box>

              <Button colorScheme="red" onClick={handleSubmit}>
                Submit Registration
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Container>

      {/* Footer */}
      <Box as="footer"  width="100%" bg="black" color="white" py="4">
        <Footer />
      </Box>
    </Flex>
  );
}
