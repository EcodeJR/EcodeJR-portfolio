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

exports.newInquiryEmail = (adminName, inquiryName, service, inquiryType) => {
  return `
    <h1>New ${inquiryType?.toUpperCase() || 'PROJECT'} Inquiry</h1>
    <p>Hi ${adminName},</p>
    <p>New inquiry from <strong>${inquiryName}</strong> for ${inquiryType === 'project' ? 'service' : 'topic'}: <strong>${service}</strong></p>
    <p><a href="${process.env.CLIENT_URL}/admin/inquiries">View Inquiry</a></p>
  `;
};

exports.userInquiryConfirmationEmail = (name, inquiryType) => {
  const isProject = inquiryType === 'project';
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #f26c0d;">INQUIRY RECEIVED</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out. Your <strong>${inquiryType}</strong> inquiry has been successfully transmitted to our system.</p>
        <p>Our team will review the details and get back to you as soon as possible.</p>
        
        ${isProject ? `
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f26c0d;">
          <p style="margin-top: 0;"><strong>Next Step:</strong> Once your project is initiated, you will receive another email with your dashboard login email and temporary password so you can monitor progress.</p>
        </div>
        ` : ''}
        
        <p>Best regards,<br>EcodeJR Support</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.8em; color: #777;">System: EcodeJR-Portfolio_Gateway_v4.2</p>
    </div>
  `;
};

exports.projectInitiatedAccountEmail = (name, projectName, email, temporaryPassword) => {
  const hasTemporaryPassword = Boolean(temporaryPassword);

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #f26c0d;">PROJECT UNDER REVIEW</h2>
        <p>Hi ${name},</p>
        <p>Your project request <strong>${projectName}</strong> has been received and is currently under review.</p>
        <p>You should expect a response from the development team soon with next steps.</p>

        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f26c0d;">
            <p style="margin-top: 0;"><strong>Dashboard Login Details</strong></p>
            <p style="margin: 6px 0;"><strong>Email:</strong> ${email}</p>
            ${hasTemporaryPassword
              ? `<p style="margin: 6px 0;"><strong>Temporary Password:</strong> ${temporaryPassword}</p>`
              : `<p style="margin: 6px 0;">Use your existing password to login. If you forgot it, use the password reset option.</p>`}
            <div style="text-align: center; margin: 20px 0 5px;">
                <a href="${process.env.CLIENT_URL}/login" style="background-color: #f26c0d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px;">LOGIN TO DASHBOARD</a>
            </div>
        </div>

        <p><strong>Security tip:</strong> Please change your password immediately after your first login.</p>
        <p>Best regards,<br>EcodeJR Support</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.8em; color: #777;">System: EcodeJR-Portfolio_Project_Onboarding</p>
    </div>
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
