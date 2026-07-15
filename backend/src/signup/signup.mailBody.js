//function for writing the mailbody
export function mailBody(links) {
  return `<div>
      <h2>Confirm it's You!</h2>
      <p>
        Thank you for registering with ThinkTweet. Please click the link below to confirm your account.
      </p>

      <br />

      <a
        href="${links}"
        target="_blank"
        >Confirm Account</a
      >

      <br />

      <p>&copy; 2026 ThinkTweet Project</p>
    </div>`;
}
