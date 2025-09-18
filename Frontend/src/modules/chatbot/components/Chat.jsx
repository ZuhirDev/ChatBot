import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { chatBotService } from "@chat/service/chatbot";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your virtual assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    let timer;
    if (isTyping) {
      timer = setTimeout(() => setShowTyping(true), 500);
    } else {
      setShowTyping(false);
    }
    return () => clearTimeout(timer);
  }, [isTyping]);


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage) return;

    const userMessage = {
      id: Date.now(),
      text: trimmedMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await chatBotService(trimmedMessage);

      if (response?.reply) {
        const botMessage = {
          id: Date.now() + 1,
          text: response.reply,
          isBot: true,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] animate-in slide-in-from-bottom-2">
          <Card className="h-full bg-background/95 backdrop-blur-md border border-border shadow-lg">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Virtual Assistant</h3>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full w-8 h-8 p-0 hover:bg-muted/50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[280px] p-3 rounded-lg ${
                        msg.isBot
                          ? "bg-muted/50 text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                {showTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[280px] p-3 rounded-lg bg-muted/50 text-foreground italic select-none">
                      <p className="text-sm">Typing...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    ref={inputRef}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    size="sm"
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </div>
    </>
  );
};

export default Chatbot;
