export default function scrollToBottom() {
  const chatAreaDiv = document.getElementById('chat-area');
  if (chatAreaDiv) {
    chatAreaDiv.scrollTo({
      top: chatAreaDiv.scrollHeight,
      behavior: 'smooth' // 平滑滚动
    });
  }
}