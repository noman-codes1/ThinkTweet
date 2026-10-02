import React from "react";
import CardOfPrivacy from "./components/CardOfPrivacy";

const ContainerOfContentOfPrivacy = () => {
  // data for the content
  const dataOfContent = [
    {
      id: 1,
      contentHeading: "Privacy & Data Collection",
      contentPara:
        "We collect only the absolute minimum data required to keep the application functioning, process your credits, and improve our analysis models. We strictly do not build profiles on our users or sell your data.",
      arrayOfList: [
        {
          head: "Authentication & Cookies:",
          content:
            "We use functional cookies for the sole purpose of keeping you logged in, so you do not have to repeatedly enter your credentials. Your password is cryptographically hashed; neither our team nor our servers can view or access it.",
        },
        {
          head: "Hosting & Anonymous Analytics:",
          content:
            "Our hosting platform automatically logs IP addresses as part of standard server operations; however, this is not actively used or controlled by us. We also collect basic page analytics - such as total page visits, country-level viewership, browser usage, and device types (desktop vs. mobile). This data is completely anonymous. We do not know who you are or link this to your identity; it is used strictly to understand our business performance and optimize our services.",
        },
        {
          head: "Tweet Analysis & Model Improvement:",
          content:
            "To improve our AI models and debug issues, we store the content of the tweets submitted for analysis and the resulting generated output in a generalized database.",
        },
        {
          head: "Absolute Anonymity:",
          content:
            "The generalized data used for model improvement is entirely decoupled from your account. Because your personal activity history is heavily encrypted on our end, there is no technical connection between your identity and the specific tweets you choose to analyze.",
        },
        {
          head: "Zero-Access History:",
          content:
            "Your personal history of analyzed content is fully encrypted. We cannot see what you have searched for, nor can anyone else.",
        },
      ],
    },
    {
      id: 2,
      contentHeading: "Security & Transparency",
      contentPara:
        "We operate on a zero-access architecture for your personal data and rely on trusted, industry-standard partners for sensitive operations.",
      arrayOfList: [
        {
          head: "Infrastructure & API Security:",
          content:
            "We utilize industry-standard infrastructure to process server requests securely. Every incoming request is filtered through multiple security guardrails designed to detect and mitigate malicious activity, API abuse, or unauthorized access.",
        },
        {
          head: "Passive Session Protection:",
          content:
            "We employ a passive security architecture that continuously monitors account session integrity. If the system detects a compromised session or a suspicious access pattern, it will automatically terminate the session and log you out to protect your account.",
        },
        {
          head: "Open Source Verification:",
          content:
            "Trust should be earned, not blindly given. Because our platform is open-source, any user with technical knowledge can inspect our codebase to verify that our data handling, encryption, and privacy claims are exactly as described.",
        },
      ],
    },
    {
      id: 3,
      contentHeading: "Terms of Service, Payments & Credits",
      contentPara:
        "By creating an account and using our analysis tools, you agree to the following operational terms regarding payments and service delivery.",
      arrayOfList: [
        {
          head: "Payment Processing:",
          content:
            "We partner with Stripe to handle all financial transactions. Stripe may store your credit card information to ensure smooth, uninterrupted service for future purchases. Our servers never collect, view, or store your credit card details.",
        },
        {
          head: "Purchase History & Dispute Resolution:",
          content:
            "While we do not store your payment methods, we do retain a strict paper trail of your purchase history (e.g., transaction IDs, credit amounts, and dates). This data is kept exclusively to resolve disputes, investigate missing credits, and verify facts if an issue arises with your account balance. This information is never used to profile you.",
        },
        {
          head: "Service Delivery:",
          content:
            "You are purchasing credits to utilize our AI analysis tools. If the service fails to deliver an analysis after credits have been deducted, our team will use your secure purchase history to verify the error and manually restore your credits or resolve the dispute.",
        },
        {
          head: "Acceptable Use:",
          content:
            "You agree not to abuse the API, attempt to bypass our security measures, or use the tool to generate highly malicious or illegal content. We reserve the right to terminate accounts that violate the integrity of the platform.",
        },
      ],
    },
  ];
  return (
    <div>
      {/* Content */}
      {dataOfContent.map((elem) => {
        return (
          <CardOfPrivacy
            key={elem.id}
            num={elem.id}
            heading={elem.contentHeading}
            para={elem.contentPara}
            listArray={elem.arrayOfList}
          />
        );
      })}

      {/* Contact Details */}
      <div>
        <h2>Contact Us</h2>
        <p>
          If you have any questions regarding your encrypted data, payment
          history, or how our open-source architecture protects you, please
          reach out to us at <span>hi@meetnoman.com</span>.
        </p>
      </div>
    </div>
  );
};

export default ContainerOfContentOfPrivacy;
