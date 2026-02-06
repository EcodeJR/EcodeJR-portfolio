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

exports.passwordResetEmail = (name, resetUrl) => {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #f26c0d;">PASSWORD RESET REQUEST</h2>
        <p>Hi ${name},</p>
        <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following button, or paste this into your browser to complete the process within 10 minutes:</p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #f26c0d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">RESET MY PASSWORD</a>
        </div>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.8em; color: #777;">System: EcodeJR-Portfolio_Recovery_Protocol</p>
    </div>
  `;
};
