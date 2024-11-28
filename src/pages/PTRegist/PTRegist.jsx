import React from "react";
import {
    Box,
    Container,
    VStack,
    Text,
    Select,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Checkbox,
    Button,
    UnorderedList,
} from "@chakra-ui/react";

export default function PTRegist() {
    return (
        <Container maxW="841px" py={8}>
            <Box borderWidth="1px" borderRadius="lg" p={6} boxShadow="lg">
                <Text p="5px" border="solid" fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
                Personal Training Program Waiver & Registration Form
                </Text>

                <VStack spacing={6} align="stretch">
                {/* Name and Phone */}
                <HStack spacing={4}>
                    <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Name" />
                    </FormControl>
                    <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input placeholder="Phone" />
                    </FormControl>
                </HStack>

                {/* Mailing Address */}
                <FormControl>
                    <FormLabel>Mailing Address</FormLabel>
                    <HStack spacing={4}>
                    <Input placeholder="Street" />
                    <Input placeholder="City" />
                    <Input placeholder="Zip Code" />
                    </HStack>
                </FormControl>

                {/* Email */}
                <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Input placeholder="Email Address" />
                </FormControl>

                {/* Date of Birth, Age, and Gender */}
                <HStack spacing={4}>
                    <FormControl>
                        <FormLabel>Date of Birth</FormLabel>
                        <Input placeholder="Date of Birth" type="date" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Age</FormLabel>
                        <Input placeholder="Age" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <Select placeholder="---Select Gender---">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Select>
                    </FormControl>
                </HStack>

                {/* Emergency Contact */}
                <HStack spacing={4}>
                    <FormControl>
                        <FormLabel>Emergency Contact</FormLabel>
                        <Input placeholder="Name" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Phone</FormLabel>
                        <Input placeholder="Emergency Contact Phone" />
                    </FormControl>
                </HStack>

                <FormControl>
                    <Text fontWeight="bold">Please make changes payable to Mary Catherine Domaleski.</Text>
                </FormControl>

                {/* Policy Text */}
                <FormControl>
                    <FormLabel fontWeight="bold">Personal Training Program Policies:</FormLabel>
                    <UnorderedList>
                        <li>
                            Each participant must sign a waiver and complete a health history questionnaire to be kept on file and will be
                             confidential between the personal trainer and the client.
                        </li>
                        <li>
                            Participants must make appointments with at least 48 hours in advance or by 5:00 pm on Fridays for Monday sessions.
                        </li>
                        <li>
                            Mary Catherine must be notified 24 hours in advance for cancellations; if notification is not at least 
                            24 hours in advance or the session is missed the participant will be charged for the session.
                        </li>
                        <li>
                            Participants 15 minutes late or more to a session will be charged for the session and lose the training for the entire session.
                        </li>
                        <li>
                            Clients are to meet the personal trainer at the agreed upon training venue at the scheduled appointment time, unless an 
                            alternate meeting place has been agreed upon between client and the personal trainer.
                        </li>
                    </UnorderedList>

                    <FormLabel textAlign="center" mb="20px" mt="30px" fontWeight="bold" textDecoration="underline" >Assumption of Risk for Participation
                         in the Personal Training Program
                    </FormLabel>

                    <Text>
                        <Text display="inline">Each participant in the Personal Training Program should realize 
                            that there are substantial risks, hazards, and danger inherent in such training.</Text>{" "}
                        <Text as="u" display="inline">
                        Each participant in the Personal Training Program must be covered by an accident and health insurance policy.
                        </Text>
                        {" "}It is the responsibility of each participant to participate only in those activities for which he/she has the prerequisite skills, 
                        qualifications, preparation, and training (as determined and instructed by the personal trainer). Mary Catherine does not warrant
                         or guarantee in any respect the physical condition or any equipment used in connection with the activity.
                    </Text>
                    <Text mt="20px">
                        <Text display="inline">Therefore, in consideration of the benefits received from the personal training program, the undersigned </Text>
                        <Text as="u" display="inline">assumes all risks of damages or injury, including death</Text>, 
                        that may be sustained by him/her while participating in an exercise activity or in travel to or from such activity.
                    </Text>
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight="bold" textDecoration="underline" textAlign="center">Release, Covenant Not to Sue, and Waiver</FormLabel>
                    <Text>
                        Personal Training involves an inherent risk of physical injury and the undersigned assumes all such risks. 
                        The undersigned hereby agrees that for the sole consideration of Mary Catherine Domaleski allowing the undersigned 
                        to participate in the Personal Training Program for which or in connection with which Mary Catherine Domaleski has 
                        made available any equipment, facilities, grounds, or personnel for such training, the undersigned does hereby release, 
                        covenant not to sue, and forever discharge Mary Catherine Domaleski and her officers, agents, and employees of any and for 
                        all claims, demands, rights, and causes of action of whatever kind or nature including but not limited to negligence, 
                        unforeseen bodily and personal injuries, damage to property, and the consequences thereof resulting from participation in 
                        any way connected with such recreational programs and activities. The undersigned understands that this Release, Covenant 
                        Not to Sue, Waiver, and Assumption of Risk shall be effective from the date of signature until the effective termination 
                        of the personal training services by Mary Catherine Domaleski. By signing this document, the undersigned hereby acknowledges 
                        that he/she has read the above carefully before signing, and agrees to comply with all the above.
                    </Text>
                </FormControl>

                {/* Agreement Checkbox */}
                <Checkbox>
                    I agree to the terms and conditions
                </Checkbox>

                {/* Signature */}
                <HStack spacing={4}>
                    <FormControl>
                        <FormLabel>Signature</FormLabel>
                        <Input placeholder="Your Signature" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <Input placeholder="Date" type="date" />
                    </FormControl>
                </HStack>

                <Text fontWeight="bold">Signature of Parent/Guardian - one signature required if participant is 17 years old or younger:</Text>
                <HStack spacing={4}>
                    <FormControl>
                        <FormLabel>Print Name</FormLabel>
                        <Input placeholder="Name"/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Signature</FormLabel>
                        <Input placeholder="Signature" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <Input placeholder="Date" type="date" />
                    </FormControl>
                </HStack>
                <FormControl>
                    <FormLabel>Address and Phone</FormLabel>
                    <Input placeholder="Address - Phone Number" />
                </FormControl>

                {/* Submit Button */}
                <Button colorScheme="blue" size="lg" w="full">
                    Submit Form
                </Button>
                </VStack>
            </Box>
        </Container>
  );
}
