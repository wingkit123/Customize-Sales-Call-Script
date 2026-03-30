export interface ScriptNode {
  id: string;
  label: string;
  text: string;
  options?: ScriptOption[];
  isTerminal?: boolean;
}

export interface ScriptOption {
  label: string;
  nextNodeId: string;
  color?: string;
}

export interface Script {
  id: string;
  title: string;
  description: string;
  nodes: Record<string, ScriptNode>;
  initialNodeId: string;
}

export const SCRIPTS: Record<string, Script> = {
  script1: {
    id: 'script1',
    title: 'Follow-up Call (Email Sent)',
    description: 'A polite follow-up call after sending an initial email proposal.',
    initialNodeId: 'opening',
    nodes: {
      opening: {
        id: 'opening',
        label: 'OPENING',
        text: 'Hi Mr/Ms [Name], Customer Service here from Peplow-Warren 😊\n\nJust checking in — I sent you an email recently regarding our Combined QEHS Internal Audit Training at Concorde Hotel Shah Alam on 28-29 April.\n\nNot sure if you had a chance to take a look?',
        options: [
          { label: "Yes, I saw it", nextNodeId: 'saw_it' },
          { label: "No, haven't seen it", nextNodeId: 'havent_seen' },
          { label: "What is it about?", nextNodeId: 'elevator_pitch' },
          { label: "I usually talk to Sean", nextNodeId: 'sean_mention' },
        ],
      },
      elevator_pitch: {
        id: 'elevator_pitch',
        label: 'ELEVATOR PITCH',
        text: 'It\'s about our upcoming Combined QEHS Internal Audit Training at Concorde Hotel (28-29 April).\n\nIn short, it\'s a very practical session for teams who need to sharpen their audit skills for QMS, EMS, and OHSMS. We\'re also including a bonus update on the new ISO 2026 transition.\n\nSince it\'s fully HRDF claimable, I wanted to see if this would be relevant for your team?',
        options: [
          { label: "What will we learn?", nextNodeId: 'learning_objectives' },
          { label: "How much is it?", nextNodeId: 'pricing_info' },
          { label: "Who is the trainer?", nextNodeId: 'trainer_info' },
          { label: "Yes, tell me more", nextNodeId: 'soft_hook' },
          { label: "Not interested", nextNodeId: 'not_relevant' },
        ]
      },
      learning_objectives: {
        id: 'learning_objectives',
        label: 'LEARNING OBJECTIVES',
        text: 'By the end of this 2-day session, your team will:\n\n1. Master the requirements of ISO 9001, 14001, and 45001.\n2. Learn practical auditing techniques based on ISO 19011.\n3. Be able to identify gaps and write professional audit reports.\n4. Get an exclusive preview of the ISO 2026 transition updates.\n\nDoes this align with your team\'s training needs for this year?',
        options: [
          { label: "Yes, sounds relevant", nextNodeId: 'soft_hook' },
          { label: "How much is it?", nextNodeId: 'pricing_info' },
          { label: "Who is the trainer?", nextNodeId: 'trainer_info' },
        ]
      },
      pricing_info: {
        id: 'pricing_info',
        label: 'PRICING & DISCOUNTS',
        text: 'The investment is RM1,280 nett per pax. This is fully HRDF claimable under the SBL-Khas scheme, so there is no upfront payment required from your company.\n\nWe also have special rates:\n• Early Bird: 10% off (Register 4 weeks early)\n• Group: 15% off (3 pax or more)\n\nWould you like me to send the official quotation for your HR to review?',
        options: [
          { label: "Yes, send quotation", nextNodeId: 'resend' },
          { label: "What are the objectives?", nextNodeId: 'learning_objectives' },
          { label: "Tell me more about the course", nextNodeId: 'soft_hook' },
        ]
      },
      trainer_info: {
        id: 'trainer_info',
        label: 'TRAINER INFO',
        text: 'Our trainers are from the Peplow-Warren Consultant Team. They are not just lecturers—they are active certification auditors and members of the ISO/MOSTI technical committees.\n\nThey bring real-world audit findings and "insider" tips on how to pass audits smoothly. It\'s very practical and hands-on.\n\nWould you like to see the trainer profiles along with the brochure?',
        options: [
          { label: "Yes, send it", nextNodeId: 'resend' },
          { label: "What will we learn?", nextNodeId: 'learning_objectives' },
          { label: "Sounds good", nextNodeId: 'soft_hook' },
        ]
      },
      sean_mention: {
        id: 'sean_mention',
        label: 'MENTION SEAN',
        text: 'Ah yes, Sean! I\'m working closely with him now to handle the training support and follow-ups. He mentioned you\'ve been a great contact for Peplow-Warren.\n\nI was just reaching out because we have that Combined QEHS Internal Audit session coming up at Concorde Hotel...',
        options: [
          { label: "Continue", nextNodeId: 'soft_hook' }
        ]
      },
      saw_it: {
        id: 'saw_it',
        label: 'IF THEY SAW IT',
        text: 'Great! Just wanted to see if the dates (28-29 April) work for your team? \n\nWe actually added a bonus session on the ISO 9001:2026 and 14001:2026 transition updates, which is quite relevant right now. Any specific questions about the HRDF claimable process?',
        options: [
          { label: "Interested / Tell me more", nextNodeId: 'soft_hook' },
          { label: "Not interested", nextNodeId: 'not_relevant' },
        ]
      },
      havent_seen: {
        id: 'havent_seen',
        label: 'IF THEY HAVEN’T SEEN',
        text: 'No worries at all, it probably got buried in your inbox. \n\nIn a nutshell, it\'s a 2-day Combined QEHS Internal Audit training at Concorde Hotel, Shah Alam. It\'s fully HRDF claimable and even includes a bonus update on the new ISO 2026 transition.\n\nWould it be worth me resending that to the top of your inbox?',
        options: [
          { label: "Yes, resend it", nextNodeId: 'resend' },
          { label: "Tell me more now", nextNodeId: 'soft_hook' },
        ],
      },
      resend: {
        id: 'resend',
        label: 'RESEND CONFIRMATION',
        text: 'Perfect, I\'ll send that over right now. I\'ll also include the poster so you can share it with your team.\n\nI\'ll follow up in a couple of days to see what you think. Thanks Mr/Ms [Name]!',
        isTerminal: true,
      },
      busy: {
        id: 'busy',
        label: 'IF THEY ARE BUSY',
        text: 'I completely understand. I\'ll keep it brief—it\'s about the Combined QEHS Internal Audit Training in April.\n\nShould I give you a call back tomorrow morning, or would you prefer I just send a quick summary via WhatsApp?',
        options: [
          { label: "Call tomorrow", nextNodeId: 'call_tomorrow' },
          { label: "Send WhatsApp", nextNodeId: 'send_whatsapp' },
        ]
      },
      call_tomorrow: {
        id: 'call_tomorrow',
        label: 'SCHEDULE CALL',
        text: 'No problem. I\'ll put a note to ring you tomorrow around 10 AM. Talk then!',
        isTerminal: true,
      },
      send_whatsapp: {
        id: 'send_whatsapp',
        label: 'SEND WHATSAPP',
        text: 'Got it. I\'ll send the key details to this number right now. Have a productive day!',
        isTerminal: true,
      },
      who_is_this: {
        id: 'who_is_this',
        label: 'RE-INTRODUCTION',
        text: 'Sorry! I\'m Wing Kit from Peplow-Warren\'s Training Support team. I\'m working alongside Sean to help manage our upcoming training sessions.\n\nWe specialize in technical training for Internal Auditors and ISO compliance, and I was reaching out because we have a Combined QEHS session coming up at Concorde Hotel...',
        options: [
          { label: "Continue", nextNodeId: 'soft_hook' }
        ]
      },
      soft_hook: {
        id: 'soft_hook',
        label: 'THE HOOK',
        text: 'The training is really practical—it covers QMS, EMS, and OHSMS, plus the new ISO 2026 transition updates. It\'s designed for teams who need to sharpen their audit skills or stay updated on the latest requirements.\n\nIs internal auditing something your team is currently focusing on?',
        options: [
          { label: "Yes", nextNodeId: 'slight_interest' },
          { label: "No", nextNodeId: 'not_relevant' },
        ],
      },
      slight_interest: {
        id: 'slight_interest',
        label: 'INTERESTED',
        text: 'Excellent. I can send over the full course outline and the HRDF claim forms. \n\nWould you like me to send that to your email, or is there someone else in HR I should coordinate with?',
        isTerminal: true,
      },
      not_relevant: {
        id: 'not_relevant',
        label: 'NOT RELEVANT',
        text: 'Understood. Is there another department that usually handles the ISO or Internal Audit training, or should I check back in a few months?',
        isTerminal: true,
      },
    }
  },
  script2: {
    id: 'script2',
    title: 'Warm Call (WhatsApp List)',
    description: 'Outreach to contacts from the company WhatsApp list.',
    initialNodeId: 'opening',
    nodes: {
      opening: {
        id: 'opening',
        label: 'OPENING',
        text: 'Hi Mr/Ms [Name], Customer Service here from Peplow-Warren 😊\n\nI\'m reaching out because your contact is in our company list. You might have been in touch with Sean previously, so I\'m helping him manage the outreach for our upcoming Combined QEHS Internal Audit Training at Concorde Hotel Shah Alam on 28-29 April.\n\nJust wanted to check if this would be relevant for your team?',
        options: [
          { label: "Yes, tell me more", nextNodeId: 'hook' },
          { label: "What is it about?", nextNodeId: 'elevator_pitch_warm' },
          { label: "I usually talk to Sean", nextNodeId: 'sean_mention_warm' },
          { label: "Not interested", nextNodeId: 'not_interested' },
        ]
      },
      elevator_pitch_warm: {
        id: 'elevator_pitch_warm',
        label: 'ELEVATOR PITCH',
        text: 'I\'m reaching out because we have a Combined QEHS Internal Audit Training coming up at Concorde Hotel Shah Alam on 28-29 April.\n\nIt\'s a 2-day practical session that covers QMS, EMS, and OHSMS, plus the new ISO 2026 transition updates. It\'s fully HRDF claimable, so it\'s a great way to upskill the team.\n\nWould this be something your department is currently looking into?',
        options: [
          { label: "What will we learn?", nextNodeId: 'learning_objectives_warm' },
          { label: "How much is it?", nextNodeId: 'pricing_info_warm' },
          { label: "Who is the trainer?", nextNodeId: 'trainer_info_warm' },
          { label: "Yes, we are", nextNodeId: 'interested' },
          { label: "No, we're good", nextNodeId: 'not_interested' },
        ]
      },
      learning_objectives_warm: {
        id: 'learning_objectives_warm',
        label: 'LEARNING OBJECTIVES',
        text: 'The training is designed to be very hands-on. Your team will:\n\n• Deep dive into ISO 9001, 14001, and 45001 requirements.\n• Practice internal auditing skills using ISO 19011 standards.\n• Learn how to write effective non-conformity reports.\n• Get the latest updates on the ISO 2026 transition.\n\nDoes that cover what your team is looking for?',
        options: [
          { label: "Yes, exactly", nextNodeId: 'interested' },
          { label: "How much is it?", nextNodeId: 'pricing_info_warm' },
          { label: "Who is the trainer?", nextNodeId: 'trainer_info_warm' },
        ]
      },
      pricing_info_warm: {
        id: 'pricing_info_warm',
        label: 'PRICING & DISCOUNTS',
        text: 'The fee is RM1,280 nett per pax. Since we are HRDF registered, it\'s 100% claimable under SBL-Khas (no cash outlay required).\n\nWe also offer:\n• 10% Early Bird discount\n• 15% Group discount (3+ pax)\n\nShould I send the brochure and a sample quotation to your email?',
        options: [
          { label: "Yes, send it", nextNodeId: 'get_email' },
          { label: "What will we learn?", nextNodeId: 'learning_objectives_warm' },
          { label: "Tell me more", nextNodeId: 'hook' },
        ]
      },
      trainer_info_warm: {
        id: 'trainer_info_warm',
        label: 'TRAINER INFO',
        text: 'Our trainers are from the Peplow-Warren Consultant Team. They are active ISO technical committee members and certification auditors, so they have a lot of "insider" knowledge on what auditors are looking for.\n\nThey focus on practical application rather than just reading slides.\n\nWould you like to see their profiles along with the course outline?',
        options: [
          { label: "Yes, send it", nextNodeId: 'get_email' },
          { label: "What will we learn?", nextNodeId: 'learning_objectives_warm' },
          { label: "Tell me about the course", nextNodeId: 'hook' },
        ]
      },
      sean_mention_warm: {
        id: 'sean_mention_warm',
        label: 'MENTION SEAN',
        text: 'That\'s right! Sean is my boss. I\'m helping him out with the coordination for our Shah Alam session at Concorde Hotel on 28-29 April.\n\nHe wanted me to check in with you specifically because it\'s fully HRDF claimable and covers the new ISO 2026 transition updates.\n\nIs your team currently looking to upskill?',
        options: [
          { label: "Yes, we are", nextNodeId: 'interested' },
          { label: "No, we're good", nextNodeId: 'not_interested' },
        ]
      },
      hook: {
        id: 'hook',
        label: 'THE HOOK',
        text: 'Great! It\'s a 2-day session at Concorde Hotel, Shah Alam (28-29 April). We focus on practical audit skills for QMS, EMS, and OHSMS, plus the latest ISO updates.\n\nIs your team currently looking to upskill your internal auditors or preparing for an ISO audit?',
        options: [
          { label: "Yes, we are", nextNodeId: 'interested' },
          { label: "No, we're good", nextNodeId: 'not_interested' },
          { label: "Talk to HR", nextNodeId: 'talk_to_hr' },
        ]
      },
      interested: {
        id: 'interested',
        label: 'INTERESTED',
        text: 'That\'s great to hear. The session is very hands-on and includes a bonus update on ISO 9001:2026 and 14001:2026.\n\nWould it make sense for me to send you the brochure and the registration details to see if it fits your schedule?',
        options: [
          { label: "Yes, send it", nextNodeId: 'get_email' }
        ]
      },
      get_email: {
        id: 'get_email',
        label: 'GET EMAIL',
        text: 'Perfect. We don\'t seem to have your latest email address on file, so may I write it down and send the training information over to you?\n\n(Wait for email) \n\nGot it. I\'ll send that over now. Should I follow up with you early next week?',
        isTerminal: true,
      },
      not_interested: {
        id: 'not_interested',
        label: 'NOT INTERESTED',
        text: 'No worries at all 😊\n\nI completely understand. Would it be okay if I just send the training poster to your email for future reference? \n\nThat way you have our contact if anything comes up later.',
        options: [
          { label: "Sure, here's my email", nextNodeId: 'get_email_soft' },
          { label: "No thanks, I'm good", nextNodeId: 'final_goodbye' },
        ]
      },
      get_email_soft: {
        id: 'get_email_soft',
        label: 'GET EMAIL (SOFT)',
        text: 'Perfect. What\'s the best email address to send that to?\n\n(Wait for email) \n\nGot it. I\'ll send that over now so you have it. Have a wonderful day ahead!',
        isTerminal: true,
      },
      final_goodbye: {
        id: 'final_goodbye',
        label: 'GOODBYE',
        text: 'Understood! Thanks for your time Mr/Ms [Name]. Have a great day ahead!',
        isTerminal: true,
      },
      talk_to_hr: {
        id: 'talk_to_hr',
        label: 'TALK TO HR',
        text: 'I understand. Is there a specific person in HR or L&D I should speak with? I\'d love to send them the HRDF claimable details directly.',
        isTerminal: true,
      },
      busy: {
        id: 'busy',
        label: 'BUSY',
        text: 'No problem. I\'ll send you a quick WhatsApp with the training details. You can check it out when you have a moment. \n\nHave a great day!',
        isTerminal: true,
      }
    }
  }
};
