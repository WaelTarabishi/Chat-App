"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import { Bot, User } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const chatParent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  return (
    <main className="flex flex-col w-full h-screen max-h-dvh bg-background ">
      <header className="p-4 border-b w-full max-w-3xl mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">AI Chat</h1>
        <ModeToggle />
      </header>

      <section className="p-4">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-3xl mx-auto items-center">
          <Input
            className="flex-1 min-h-[40px]"
            placeholder="Type your question here..."
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <Button className="ml-[8px]" type="submit">
            Submit
          </Button>
        </form>
      </section>

      <section className="container px-0 pb-10 flex border border-muted-foreground flex-col flex-grow gap-4 mx-auto max-w-3xl">
        <ul
          ref={chatParent}
          className="h-1 p-4 flex-grow bg-muted/20 rounded-lg overflow-y-auto flex flex-col gap-4">
          {messages.map((m, index) => (
            <>
              {m.role === "user" ? (
                <li key={index} className="flex flex-row">
                  <div className="rounded-xl p-4 bg-muted/40 shadow-xl   flex flex-col">
                    <p className="text-primary flex">
                      <User className="h-5 w-5" />
                      Me:
                    </p>
                    <p>{m.content}</p>
                  </div>
                </li>
              ) : (
                <li key={index} className="flex flex-row-reverse ">
                  <div className="rounded-xl p-4 bg-muted/50 shadow-md flex w-3/4">
                    <p className="text-primary">
                      <span className="font-bold flex ">
                        <Bot className="h-5 w-5" /> Bot:
                      </span>
                      {m.content}
                    </p>
                  </div>
                </li>
              )}
            </>
          ))}
        </ul>
      </section>
    </main>
  );
}
