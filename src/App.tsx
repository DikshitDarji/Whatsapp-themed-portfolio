import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Download, Github, Linkedin, Mail, Phone, MapPin, Check } from 'lucide-react';

type Message = {
  text: string;
  isUser?: boolean;
  timestamp?: string;
  isTyping?: boolean;
  downloadButton?: boolean;
  status?: 'sent' | 'delivered' | 'read';
};

const KEYWORDS = ['skills', 'resume', 'education', 'address', 'contact', 'projects', 'clear'];
const SKILLS = ['HTML', 'CSS', 'JavaScript', 'React', 'Node', 'Express', 'MongoDB', 'C', 'C++'];

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey there! 👋 I'm Dikshit Darji", timestamp: getCurrentTime() },
    { text: "I'm a Frontend Developer passionate about creating robust and scalable web applications.", timestamp: getCurrentTime() },
    { text: "Type 'more' to see what I can help you with!", timestamp: getCurrentTime() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am'; // Lowercase am/pm to match WhatsApp style
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/DikshitDarji_CS_Resume.pdf';
    link.download = 'DikshitDarji_CS_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const simulateTyping = async (response: Message) => {
    setIsTyping(true);
    setMessages(prev => [...prev, { text: '', isTyping: true }]);
    scrollToBottom();

    // Simulate typing delay (between 1 to 2 seconds)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));
    
    setIsTyping(false);
    setMessages(prev => [...prev.slice(0, -1), { ...response, timestamp: getCurrentTime() }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true, timestamp: getCurrentTime(), status: 'read' as const };
    const lowerInput = input.toLowerCase();
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    if (lowerInput === 'more') {
      await simulateTyping({
        text: "Here are some keywords you can type to learn more about me:\n• skills - See my technical skills\n• resume - Download my resume\n• education - View my educational background\n• address - Get my location\n• contact - Find my contact information\n• projects - Check out my projects\n• clear - Clear the chat"
      });
    } else if (lowerInput === 'skills') {
      await simulateTyping({
        text: "My Technical Skills:\n" + SKILLS.join(' • ')
      });
    } else if (lowerInput === 'resume') {
      await simulateTyping({
        text: "You can download my resume here:"
      });
      await simulateTyping({
        text: "📄 Click to download resume",
        downloadButton: true
      });
    } else if (lowerInput === 'education') {
      await simulateTyping({
        text: "🎓 Education:\n\n• B.Tech from Techno India NJR Institute of Technology, Udaipur\n• 12th from Pratap Sr. Sec. School Chawand\n• 10th from Pratap Sr. Sec. School Chawand"
      });
    } else if (lowerInput === 'address') {
      await simulateTyping({
        text: "📍 Location:\nParsad, Udaipur, Rajasthan"
      });
    } else if (lowerInput === 'contact') {
      await simulateTyping({
        text: "📱 Contact Information:\n\n• LinkedIn: https://www.linkedin.com/in/iamdikshitdarji/\n• Phone: +91 9828418225\n• Email: darjidikshit30@gmail.com"
      });
    } else if (lowerInput === 'projects') {
      await simulateTyping({
        text: "🚀 Check out my projects on GitHub:\nhttps://github.com/DikshitDarji?tab=repositories"
      });
    } else if (lowerInput === 'clear') {
      setMessages([
        { text: "Hey there! 👋 I'm Dikshit Darji", timestamp: getCurrentTime() },
        { text: "I'm a Full Stack Developer passionate about creating robust and scalable web applications.", timestamp: getCurrentTime() },
        { text: "Type 'more' to see what I can help you with!", timestamp: getCurrentTime() }
      ]);
    } else {
      await simulateTyping({
        text: "I didn't understand that. Type 'more' to see available commands."
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#efeae2] flex items-center justify-center p-0 sm:p-4">
      <div className="w-full h-screen sm:h-auto sm:max-w-2xl bg-white rounded-none sm:rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#075e54] text-white p-3 sm:p-4 flex items-center gap-2 sm:gap-3 sticky top-0 z-10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=Dikshit+Darji&background=random" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-semibold">Dikshit Darji</h1>
            <p className="text-xs sm:text-sm opacity-90">online</p>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          className="flex-1 h-[calc(100vh-120px)] sm:h-[600px] overflow-y-auto p-2 sm:p-4 bg-[#e5ddd5] relative space-y-3 sm:space-y-4"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px'
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} w-full`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] p-2.5 sm:p-3 rounded-lg relative break-words ${message.isUser ? 'bg-[#dcf8c6] text-black' : 'bg-white text-black'} ${message.isUser ? 'message-tail-right' : 'message-tail-left'}`}
              >
                {message.isTyping ? (
                  <div className="flex gap-1 items-center p-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                ) : (
                  <>
                    <pre className="whitespace-pre-wrap font-sans text-sm">{message.text.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line.split(' ').map((word, j) => {
                            if (word.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                              return (
                                <React.Fragment key={j}>
                                  <a
                                    href={`mailto:${word}`}
                                    className="text-blue-600 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {word}
                                  </a>{' '}
                                </React.Fragment>
                              );
                            } else if (word.startsWith('http://') || word.startsWith('https://')) {
                              return (
                                <React.Fragment key={j}>
                                  <a
                                    href={word}
                                    className="text-blue-600 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {word}
                                  </a>{' '}
                                </React.Fragment>
                              );
                            }
                            return <React.Fragment key={j}>{word} </React.Fragment>;
                          })}
                          {i < message.text.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}</pre>
                    {message.downloadButton && (
                      <button
                        onClick={handleDownloadResume}
                        className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Download size={16} />
                        Download Resume
                      </button>
                    )}
                    <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1 justify-end">
                      {message.timestamp}
                      {message.isUser && message.status === 'read' && (
                        <Check className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-[#f0f0f0] p-2 sm:p-3 flex items-center gap-2 sticky bottom-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="flex-1 px-3 sm:px-4 py-2 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#075e54] bg-white text-sm sm:text-base"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 rounded-full bg-[#075e54] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#054c44] transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;