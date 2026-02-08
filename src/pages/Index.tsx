import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { useApiKey } from '@/hooks/useApiKey';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { ReportPanel } from '@/components/chat/ReportPanel';
import { SettingsDialog } from '@/components/chat/SettingsDialog';
import { BreathingExercise } from '@/components/chat/BreathingExercise';
import { GuidedMeditation } from '@/components/chat/GuidedMeditation';
import { CrisisResources } from '@/components/chat/CrisisResources';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const { apiKey, setApiKey, clearApiKey, hasApiKey } = useApiKey();
  
  const {
    messages,
    currentLanguage,
    isTyping,
    latestReport,
    sendMessage,
    setLanguage,
  } = useChat(apiKey);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [isMeditationOpen, setIsMeditationOpen] = useState(false);
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen bg-gradient-calm dark:bg-gradient-dark">
      {/* Header */}
      <ChatHeader
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenBreathing={() => setIsBreathingOpen(true)}
        onOpenMeditation={() => setIsMeditationOpen(true)}
        messageCount={messages.filter(m => m.role === 'user').length}
        hasApiKey={hasApiKey}
      />

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <ChatInput
        onSend={sendMessage}
        disabled={isTyping}
        placeholder={
          currentLanguage === 'ta'
            ? 'உங்கள் மனதில் என்ன இருக்கிறது என்று பகிரவும்...'
            : currentLanguage === 'hi'
            ? 'अपने मन की बात साझा करें...'
            : "Share what's on your mind..."
        }
        onOpenCrisisResources={() => setIsCrisisOpen(true)}
      />

      {/* Report Panel */}
      <ReportPanel
        report={latestReport}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={setApiKey}
        onClearApiKey={clearApiKey}
      />

      {/* Breathing Exercise */}
      <BreathingExercise
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
      />

      {/* Guided Meditation */}
      <GuidedMeditation
        isOpen={isMeditationOpen}
        onClose={() => setIsMeditationOpen(false)}
      />

      {/* Crisis Resources */}
      <CrisisResources
        isOpen={isCrisisOpen}
        onClose={() => setIsCrisisOpen(false)}
      />

      {/* Backdrop for report panel */}
      {isReportOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          onClick={() => setIsReportOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
