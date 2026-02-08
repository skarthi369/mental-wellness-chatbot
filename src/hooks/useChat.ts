import { useState, useCallback, useEffect } from 'react';
import { Message, Language, MentalHealthReport, ConversationState, EmotionAnalysis } from '@/types/chat';
import { generateResponse, generateReport, getWelcomeMessage } from '@/services/mockAIService';
import { generateAIResponse } from '@/services/openRouterService';

export function useChat(apiKey?: string) {
  const [state, setState] = useState<ConversationState>({
    messages: [],
    currentLanguage: 'en',
    isTyping: false,
    latestReport: undefined,
  });

  // Add welcome message on mount or language change
  useEffect(() => {
    // Only add welcome message if the conversation is empty
    if (state.messages.length === 0) {
      const welcomeMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: getWelcomeMessage(state.currentLanguage),
        timestamp: new Date(),
        language: state.currentLanguage,
      };
      setState(prev => ({ ...prev, messages: [welcomeMessage] }));
    }
  }, [state.currentLanguage, state.messages.length]);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
      language: state.currentLanguage,
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    try {
      let response: string;
      let analysis: EmotionAnalysis;

      // Use real AI if API key is available, otherwise use mock
      if (apiKey) {
        const aiResult = await generateAIResponse(
          content,
          state.messages,
          state.currentLanguage,
          apiKey
        );
        response = aiResult.response;
        analysis = aiResult.analysis;
      } else {
        const mockResult = await generateResponse(
          content,
          state.messages,
          state.currentLanguage
        );
        response = mockResult.response;
        analysis = mockResult.analysis;
      }
      const updatedUserMessage = { ...userMessage, analysis };

      // Add assistant message
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        language: state.currentLanguage,
      };

      setState(prev => ({
        ...prev,
        messages: prev.messages.map(m =>
          m.id === userMessage.id ? updatedUserMessage : m
        ).concat(assistantMessage),
        isTyping: false,
      }));

      // Generate report after a few exchanges
      const allMessages = [...state.messages, updatedUserMessage, assistantMessage];
      if (allMessages.filter(m => m.role === 'user').length >= 2) {
        const report = await generateReport(allMessages);
        setState(prev => ({ ...prev, latestReport: report }));
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setState(prev => ({ ...prev, isTyping: false }));
    }
  }, [state.messages, state.currentLanguage, apiKey]);

  const setLanguage = useCallback((language: Language) => {
    setState(prev => ({ ...prev, currentLanguage: language }));
  }, []);

  const refreshReport = useCallback(async () => {
    if (state.messages.length > 2) {
      const report = await generateReport(state.messages);
      setState(prev => ({ ...prev, latestReport: report }));
    }
  }, [state.messages]);

  return {
    messages: state.messages,
    currentLanguage: state.currentLanguage,
    isTyping: state.isTyping,
    latestReport: state.latestReport,
    sendMessage,
    setLanguage,
    refreshReport,
  };
}
