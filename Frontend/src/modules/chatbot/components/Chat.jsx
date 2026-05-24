import { MessageCircle, X, Send, Bot, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatBotService } from "@chat/service/chatbot";
import { cn } from "@/lib/utils";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hola, bienvenido. Soy tu asistente virtual y estoy aquí para ayudarte. ¿En qué puedo asistirte hoy?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    let timer;

    if (isTyping) {
      timer = setTimeout(() => setShowTyping(true), 400);
    } else {
      setShowTyping(false);
    }

    return () => clearTimeout(timer);
  }, [isTyping]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isTyping) {
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
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await chatBotService(trimmedMessage);

      if (response?.reply) {
        const botMessage = {
          id: Date.now() + 1,
          text: response.reply,
          isBot: true,
          timestamp: new Date(),
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
        <div className="fixed bottom-20 right-6 z-50 w-[90vw] sm:w-[420px] h-[600px] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <Card className="h-full flex flex-col bg-background border border-border/50 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-border/30 bg-gradient-to-r from-primary/5 via-background to-background space-y-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                  <Zap className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-sm tracking-tight text-foreground">
                    Asistente Virtual
                  </h3>

                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-sm" />

                    <p className="text-xs text-muted-foreground">
                      En línea
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="rounded-lg w-8 h-8 hover:bg-muted transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>

            <ScrollArea className="flex-1 overflow-hidden">
              <div className="space-y-3 p-4 pr-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-2.5 items-end animate-in fade-in slide-in-from-bottom-2 duration-300",
                      msg.isBot ? "justify-start" : "justify-end"
                    )}
                  >
                    {msg.isBot && (
                      <div className="w-7 h-7 rounded-md bg-muted/80 border border-border/50 flex items-center justify-center text-muted-foreground flex-shrink-0 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "flex flex-col max-w-xs",
                        !msg.isBot && "items-end"
                      )}
                    >
                      <div
                        className={cn(
                          "px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm border transition-all",
                          msg.isBot
                            ? "bg-muted/50 text-foreground rounded-bl-none border-border/30 hover:bg-muted/70"
                            : "bg-primary text-primary-foreground rounded-br-none font-medium border-primary/80"
                        )}
                      >
                        <p className="whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                      </div>

                      <span
                        className={cn(
                          "text-[11px] text-muted-foreground font-medium block px-1 mt-1",
                          !msg.isBot && "text-right"
                        )}
                      >
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {showTyping && (
                  <div className="flex gap-2.5 items-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-7 h-7 rounded-md bg-muted/80 border border-border/50 flex items-center justify-center text-muted-foreground flex-shrink-0 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>

                    <div className="bg-muted/50 border border-border/30 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border/30 bg-background/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 bg-muted/40 border border-border/50 rounded-lg p-2 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/50 transition-all duration-200">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-9 text-sm placeholder:text-muted-foreground/60"
                  disabled={isTyping}
                  aria-label="Escribe un mensaje"
                />

                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="rounded-md w-8 h-8 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center",
          isOpen
            ? "bg-destructive/80 hover:bg-destructive text-white"
            : "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-110 active:scale-95"
        )}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-in spin-in-90 duration-200" />
        ) : (
          <MessageCircle className="w-6 h-6 animate-in fade-in duration-200" />
        )}
      </button>
    </>
  );
};

export default Chatbot;