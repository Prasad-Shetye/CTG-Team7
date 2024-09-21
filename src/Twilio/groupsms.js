const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";


const accountSid = process.env.ACCOUNT_SID;
const authToken = process.send.AUTH_TOKEN;
const client = twilio(accountSid, authToken);


// Function to create a new conversation (SMS group)
async function createConversation() {
  const conversation = await client.conversations.v1.conversations.create({
    friendlyName: 'RealEstateGroup' // Name of the group
  });
  
  console.log('Conversation SID:', conversation.sid);
  return conversation.sid;
}

// Function to add participants (phone numbers) to the conversation
async function addParticipants(conversationSid, phoneNumber) {
  const participant = await client.conversations.v1
    .conversations(conversationSid)
    .participants.create({
      'messagingBinding.address': phoneNumber // The phone number of the participant
    });

  console.log('Added participant:', participant.sid);
}

// Main function to create the group and add participants
async function createGroup() {
  // Step 1: Create the conversation
  const conversationSid = await createConversation();

  // Step 2: Add participants to the group
  const participants = ['4702225337', '4702660559']; // Replace with actual participant phone numbers

  for (const phoneNumber of participants) {
    await addParticipants(conversationSid, phoneNumber);
  }

  console.log('SMS Group created successfully!');
}

// Function to send a message to the group
async function sendMessage(conversationSid, message) {
  const messageResponse = await client.conversations.v1
    .conversations(conversationSid)
    .messages.create({
      body: message
    });

  console.log('Message sent with SID:', messageResponse.sid);
}

// Call the createGroup function to create the group and add participants
createGroup().then(() => {
  // After creating the group, send a message to the group
  sendMessage('conversationSid', 'Hello, welcome to the group!'); // Replace 'conversationSid' with the actual conversation SID
});
