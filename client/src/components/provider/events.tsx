import { createContext, useContext, useEffect, useState } from "react"
import { Log, Agent, Message, Interaction } from "@/types/event"
import { listen } from "@tauri-apps/api/event"

const initialLogs: Log[] = []
const initialInteractions: Interaction[] = []
const initialEventContext = {
  logs: initialLogs,
  interactions: initialInteractions,
  addInteraction: (id: string, type: string) => { },
  removeInteraction: (id: string, type: string) => { },
  setHistory: (id: string, type: string, history: string[]) => { },
  setCommand: (id: string, type: string, command: string[]) => { },
}

const EventProviderContext = createContext(initialEventContext)

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const unlisten = listen<Message>('event', (event) => {
      if (event.payload.log) {
        setLogs(prev => {
          let messages = [...prev, event.payload.log]
          if (messages.length > 1000) {
            messages = messages.slice(0, messages.length - 1000)
          }
          return messages
        })
      }

      if (event.payload.agent) {
        console.log("AGENT COMMS TO BE IMPLEMENTED")
        console.log(event.payload.agent)
      }
    });

    return () => {
      unlisten.then((off) => off());
    };
  });

  function addInteraction(id: string, type: string) {
    if (interactions.find(inter => inter.id == id && inter.type == type)) {
      return
    }

    setInteractions(prev =>
      [...prev,
      {
        history: [`${type} is now open for agent ${id}`],
        commands: [],
        id: id,
        type: type
      }
      ]
    )
  }

  function removeInteraction(id: string, type: string) {
    setInteractions(prev => prev.filter(p => p.id !== id || p.type != type))
  }

  function setHistory(id: string, type: string, history: string[]) {
    let inters = [...interactions]
    let inter = interactions.find(it => it.id === id && it.type === type)

    if (inter) {
      inter.history = history
      setInteractions(inters)
    }
  }

  function setCommand(id: string, type: string, command: string[]) {
    let inters = [...interactions]
    let inter = interactions.find(it => it.id === id && it.type === type)

    if (inter) {
      inter.commands = command
      setInteractions(inters)
    }
  }

  return (
    <EventProviderContext.Provider value={{
      logs,
      interactions,
      addInteraction,
      removeInteraction,
      setHistory,
      setCommand
    }}>
      {children}
    </EventProviderContext.Provider>
  )
}


export function useEvents() {
  return useContext(EventProviderContext)
}
