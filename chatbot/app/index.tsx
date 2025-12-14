import * as Speech from "expo-speech";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ChatBubble } from "../src/components/ChatBubble";
import { ChatInput } from "../src/components/ChatInput";
import { VoiceButton } from "../src/components/VoiceButton";
import { useAudioRecorder } from "../src/hooks/useAudioRecorder";
import { sendChatMessage, transcribeAudio } from "../src/services/api";
import { Message } from "../src/types/chat";

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { isRecording, startRecording, stopRecording } = useAudioRecorder();

  // Generate unique ID
  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Scroll to bottom when new message arrives
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Send message and get AI response
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    scrollToBottom();

    try {
      // Prepare messages for API (only role and content)
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Get AI response
      const reply = await sendChatMessage(apiMessages);

      // Add AI message
      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      scrollToBottom();

      // Speak the response
      Speech.speak(reply, { language: "en", rate: 0.9 });
    } catch (error) {
      console.error("Error:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: "Sorry, I had trouble responding. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle voice recording
  const handleVoiceStart = () => {
    Speech.stop(); // Stop any ongoing speech
    startRecording();
  };

  const handleVoiceEnd = async () => {
    const audioUri = await stopRecording();

    if (!audioUri) return;

    setIsLoading(true);

    try {
      // Transcribe the audio
      const transcript = await transcribeAudio(audioUri);

      if (transcript) {
        // Send the transcribed text as a message
        await handleSendMessage(transcript);
      }
    } catch (error) {
      console.error("Transcription error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: "Sorry, I couldn't understand the audio. Please try again.",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="px-4 py-3 border-b border-gray-200">
          <Text className="text-xl font-bold text-center">
            AI Learning Tutor
          </Text>
          <Text className="text-gray-500 text-center text-sm">
            Ask me anything!
          </Text>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 py-2"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.length === 0 && (
            <View className="items-center justify-center py-20">
              <Text className="text-6xl mb-4">👋</Text>
              <Text className="text-gray-500 text-center text-lg">
                Hello! I'm your AI tutor.
              </Text>
              <Text className="text-gray-400 text-center mt-2">
                Type a message or hold the mic to speak
              </Text>
            </View>
          )}

          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <View className="self-start bg-gray-200 rounded-2xl px-4 py-3 mb-3">
              <ActivityIndicator size="small" color="#6B7280" />
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View className="px-4 py-3 border-t border-gray-200 gap-3">
          <ChatInput
            onSend={handleSendMessage}
            isDisabled={isLoading || isRecording}
          />

          <View className="items-center py-2">
            <VoiceButton
              isRecording={isRecording}
              isDisabled={isLoading}
              onPressIn={handleVoiceStart}
              onPressOut={handleVoiceEnd}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
