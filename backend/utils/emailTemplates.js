exports.welcomeEmail = (name) => {
    return `
    <h1>Welcome ${name}!</h1>
    <p>Your account has been created successfully.</p>
    <p>You can now login and track your project progress.</p>
  `;
};

exports.milestoneUpdateEmail = (clientName, projectName, milestoneName, status) => {
    return `
    <h1>Project Update</h1>
    <p>Hi ${clientName},</p>
    <p>Your project "<strong>${projectName}</strong>" has been updated.</p>
    <p>Milestone: <strong>${milestoneName}</strong></p>
    <p>Status: <strong>${status}</strong></p>
    <p><a href="${process.env.CLIENT_URL}/client/projects">View Project Details</a></p>
  `;
};

exports.newMessageEmail = (recipientName, senderName, projectName) => {
    return `
    <h1>New Message</h1>
    <p>Hi ${recipientName},</p>
    <p>${senderName} sent you a message about "${projectName}".</p>
    <p><a href="${process.env.CLIENT_URL}/client/messages">View Message</a></p>
  `;
};

exports.newInquiryEmail = (adminName, inquiryName, service) => {
    return `
    <h1>New Project Inquiry</h1>
    <p>Hi ${adminName},</p>
    <p>New inquiry from <strong>${inquiryName}</strong> for service: <strong>${service}</strong></p>
    <p><a href="${process.env.CLIENT_URL}/admin/inquiries">View Inquiry</a></p>
  `;
};
