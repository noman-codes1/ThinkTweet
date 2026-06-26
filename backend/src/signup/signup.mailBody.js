export function mailBody(links) {
  return `<div style="height: 100%; background-color: #000000">
      <p style="color: #ffffff">
        Confirm it's You! Thank you for registering to the ThinkTweet. Please
        confirm the click below button to confirm
      </p>

      <br />

      <a
        style="
          text-decoration: none;
          background-color: #808080;
          padding: 5px 10px;
          color: #ffffff;
          border-radius: 8px;
          margin-top: 5px;
        "
        href="${links}"
        target="_blank"
        >Confirm Account</a
      >
      <br />
      <p>&copy; 2026 ThinkTweet Project</p>
    </div>`;
}
