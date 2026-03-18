const APP_URL = process.env.CLIENT_URL || '';

const STATUS_STYLES = {
  completed: { bg: '#dcfce7', text: '#166534', border: '#86efac', label: 'Completed' },
  in_progress: { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd', label: 'In Progress' },
  delayed: { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5', label: 'Delayed' },
  blocked: { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5', label: 'Blocked' },
  not_started: { bg: '#f3f4f6', text: '#374151', border: '#d1d5db', label: 'Not Started' }
};

const getStatusStyle = (status) => {
  return STATUS_STYLES[status] || {
    bg: '#ffedd5',
    text: '#9a3412',
    border: '#fdba74',
    label: String(status || 'updated').replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  };
};

const createButton = (url, label) => {
  return `
    <a href="${url}" style="display: inline-block; padding: 12px 22px; background: linear-gradient(120deg, #f26c0d, #ea580c); color: #ffffff; text-decoration: none; border-radius: 999px; font-weight: 700; font-size: 13px; letter-spacing: 0.03em;">${label}</a>
  `;
};

const renderEmailShell = ({
  eyebrow,
  title,
  greeting,
  intro,
  detailsHtml,
  extraHtml,
  ctaLabel,
  ctaUrl,
  systemTag
}) => {
  return `
    <div style="margin: 0; padding: 28px 12px; background-color: #f5f7fb;">
      <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12); font-family: Arial, Helvetica, sans-serif; color: #1f2937;">
        <div style="padding: 22px 26px; background: linear-gradient(140deg, #111827, #1f2937 45%, #f26c0d 140%);">
          <p style="margin: 0; color: #fdba74; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700;">${eyebrow}</p>
          <h1 style="margin: 12px 0 0; color: #ffffff; font-size: 28px; line-height: 1.2;">${title}</h1>
        </div>

        <div style="padding: 28px 26px; background-color: #ffffff;">
          <p style="margin: 0 0 14px; font-size: 16px; line-height: 1.6; color: #111827;">${greeting}</p>
          <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.7; color: #374151;">${intro}</p>

          ${detailsHtml || ''}
          ${extraHtml || ''}

          ${ctaLabel && ctaUrl ? `
            <div style="margin: 24px 0 12px;">${createButton(ctaUrl, ctaLabel)}</div>
          ` : ''}

          <p style="margin: 18px 0 0; font-size: 14px; line-height: 1.7; color: #4b5563;">Best regards,<br><strong>EcodeJR Support</strong></p>
        </div>

        <div style="padding: 14px 26px 18px; border-top: 1px solid #f1f5f9; background-color: #fbfdff;">
          <p style="margin: 0; font-size: 11px; color: #94a3b8; letter-spacing: 0.07em; text-transform: uppercase;">${systemTag}</p>
        </div>
      </div>
    </div>
  `;
};

const infoGrid = (rows) => {
  const rowMarkup = rows
    .map((row) => {
      return `
        <tr>
          <td style="padding: 10px 12px; width: 180px; border: 1px solid #e5e7eb; background-color: #f8fafc; color: #475569; font-size: 13px; font-weight: 700;">${row.label}</td>
          <td style="padding: 10px 12px; border: 1px solid #e5e7eb; background-color: #ffffff; color: #111827; font-size: 13px;">${row.value}</td>
        </tr>
      `;
    })
    .join('');

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin: 8px 0 18px; border-radius: 12px; overflow: hidden;">
      ${rowMarkup}
    </table>
  `;
};

exports.welcomeEmail = (name) => {
  return renderEmailShell({
    eyebrow: 'Account Ready',
    title: 'Welcome Aboard',
    greeting: `Hi ${name},`,
    intro: 'Your account has been created successfully. You can now sign in to monitor your project timeline, check updates, and communicate directly with the team.',
    detailsHtml: infoGrid([
      { label: 'Portal Access', value: 'Client dashboard is now active' },
      { label: 'Next Step', value: 'Login and review your project area' }
    ]),
    ctaLabel: 'Open Dashboard',
    ctaUrl: `${APP_URL}/login`,
    systemTag: 'System: EcodeJR-Portfolio_Onboarding'
  });
};

exports.milestoneUpdateEmail = (clientName, projectName, milestoneName, status) => {
  const statusStyle = getStatusStyle(status);

  return renderEmailShell({
    eyebrow: 'Project Progress',
    title: 'Milestone Updated',
    greeting: `Hi ${clientName},`,
    intro: `There is a new update on your project "${projectName}". Your latest milestone has moved forward and the dashboard now reflects the current delivery state.`,
    detailsHtml: `
      ${infoGrid([
        { label: 'Project', value: projectName },
        { label: 'Milestone', value: milestoneName },
        {
          label: 'Status',
          value: `<span style="display: inline-block; padding: 4px 10px; border-radius: 999px; background-color: ${statusStyle.bg}; border: 1px solid ${statusStyle.border}; color: ${statusStyle.text}; font-size: 12px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase;">${statusStyle.label}</span>`
        }
      ])}
    `,
    ctaLabel: 'View Project Details',
    ctaUrl: `${APP_URL}/client/projects`,
    systemTag: 'System: EcodeJR-Portfolio_Milestone_Notifier'
  });
};

exports.newMessageEmail = (recipientName, senderName, projectName) => {
  return renderEmailShell({
    eyebrow: 'Inbox Alert',
    title: 'New Message Received',
    greeting: `Hi ${recipientName},`,
    intro: `${senderName} sent you a new message about "${projectName}". Open your inbox to reply and keep the project communication moving.`,
    detailsHtml: infoGrid([
      { label: 'From', value: senderName },
      { label: 'Project', value: projectName },
      { label: 'Action', value: 'Read and respond from your dashboard inbox' }
    ]),
    ctaLabel: 'Open Messages',
    ctaUrl: `${APP_URL}/client/messages`,
    systemTag: 'System: EcodeJR-Portfolio_Messaging_Alert'
  });
};

exports.newInquiryEmail = (adminName, inquiryName, service, inquiryType) => {
  const normalizedType = inquiryType?.toUpperCase() || 'PROJECT';

  return renderEmailShell({
    eyebrow: 'Admin Notification',
    title: `New ${normalizedType} Inquiry`,
    greeting: `Hi ${adminName},`,
    intro: 'A fresh inquiry has entered the pipeline and is waiting for your review. Open the admin board to evaluate the brief and proceed.',
    detailsHtml: infoGrid([
      { label: 'Contact Name', value: inquiryName },
      { label: inquiryType === 'project' ? 'Service Requested' : 'Topic', value: service },
      { label: 'Inquiry Type', value: normalizedType }
    ]),
    ctaLabel: 'Review Inquiry',
    ctaUrl: `${APP_URL}/admin/inquiries`,
    systemTag: 'System: EcodeJR-Portfolio_Admin_Inbox'
  });
};

exports.userInquiryConfirmationEmail = (name, inquiryType) => {
  const isProject = inquiryType === 'project';

  return renderEmailShell({
    eyebrow: 'Confirmation',
    title: 'Inquiry Received',
    greeting: `Hi ${name},`,
    intro: `Thank you for reaching out. Your ${inquiryType} inquiry has been submitted successfully and is currently queued for team review.`,
    detailsHtml: isProject
      ? `
        <div style="margin: 8px 0 18px; padding: 14px 16px; border: 1px solid #fed7aa; border-left: 5px solid #f26c0d; border-radius: 12px; background-color: #fff7ed;">
          <p style="margin: 0; color: #9a3412; font-size: 14px; line-height: 1.6;"><strong>Next Step:</strong> Once your project is initiated, you will receive another email containing your dashboard login email and temporary password for first-time login.</p>
        </div>
      `
      : infoGrid([{ label: 'Status', value: 'Received and under review' }]),
    systemTag: 'System: EcodeJR-Portfolio_Gateway_v4.2'
  });
};

exports.projectInitiatedAccountEmail = (name, projectName, email, temporaryPassword) => {
  const hasTemporaryPassword = Boolean(temporaryPassword);

  return renderEmailShell({
    eyebrow: 'Client Access Ready',
    title: 'Project Under Review',
    greeting: `Hi ${name},`,
    intro: `Your project request "${projectName}" has been initiated and is now under review. You should expect a response from the development team shortly.`,
    detailsHtml: infoGrid([
      { label: 'Project', value: projectName },
      { label: 'Login Email', value: `<span style="font-family: Consolas, monospace; font-size: 13px;">${email}</span>` },
      {
        label: 'Temporary Password',
        value: `<span style="font-family: Consolas, monospace; font-size: 13px;">${hasTemporaryPassword ? temporaryPassword : 'Use your existing password or reset it if needed.'}</span>`
      }
    ]),
    extraHtml: `
      <div style="margin: 6px 0 18px; padding: 12px 14px; border-radius: 12px; border: 1px solid #bfdbfe; background-color: #eff6ff;">
        <p style="margin: 0; color: #1e3a8a; font-size: 13px; line-height: 1.6;"><strong>Security tip:</strong> Change your password immediately after your first login to keep your account secure.</p>
      </div>
    `,
    ctaLabel: 'Login To Dashboard',
    ctaUrl: `${APP_URL}/login`,
    systemTag: 'System: EcodeJR-Portfolio_Project_Onboarding'
  });
};

exports.projectInitiatedAccountEmailText = (name, projectName, email, temporaryPassword) => {
  const loginPassword = temporaryPassword || 'Use your existing password or reset it if needed.';

  return [
    `Hi ${name},`,
    '',
    `Your project request "${projectName}" has been received and is currently under review.`,
    'You should expect a response from the development team soon with next steps.',
    '',
    'Dashboard Login Details',
    `Login Email: ${email}`,
    `Temporary Password: ${loginPassword}`,
    `Login URL: ${APP_URL}/login`,
    '',
    'Please change your password immediately after your first login.',
    '',
    'Best regards,',
    'EcodeJR Support'
  ].join('\n');
};

exports.passwordResetEmail = (name, resetUrl) => {
  return renderEmailShell({
    eyebrow: 'Account Security',
    title: 'Password Reset Request',
    greeting: `Hi ${name},`,
    intro: 'A request was made to reset the password for your account. Use the secure button below to create a new password. This link is valid for 10 minutes.',
    detailsHtml: `
      <div style="margin: 8px 0 18px; padding: 14px 16px; border: 1px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 12px; background-color: #fef2f2;">
        <p style="margin: 0; color: #991b1b; font-size: 14px; line-height: 1.6;">If you did not request this reset, you can safely ignore this email and your password will remain unchanged.</p>
      </div>
    `,
    ctaLabel: 'Reset My Password',
    ctaUrl: resetUrl,
    systemTag: 'System: EcodeJR-Portfolio_Recovery_Protocol'
  });
};
