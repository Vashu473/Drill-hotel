"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Mail, Trash2, Check, MailOpen } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const load = () => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((d) => setMessages(d.messages ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const markRead = async (id: string, read: boolean) => {
    const res = await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });

    if (res.ok) {
      load();
      if (selected?.id === id) setSelected((s) => (s ? { ...s, read } : s));
    }
  };

  const openMessage = async (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.read) await markRead(msg.id, true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;

    const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Message deleted");
      if (selected?.id === id) setSelected(null);
      load();
    } else {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="text-muted">Loading...</p>;

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-cream">Contact Messages</h1>
      <p className="mt-1 text-muted">
        {unread > 0 ? `${unread} unread message${unread > 1 ? "s" : ""}` : "All messages read"}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-sm border border-gold/10">
          {messages.length === 0 ? (
            <p className="p-8 text-center text-muted">No messages yet</p>
          ) : (
            <ul className="max-h-[600px] divide-y divide-gold/5 overflow-y-auto">
              {messages.map((msg) => (
                <li key={msg.id}>
                  <button
                    onClick={() => openMessage(msg)}
                    className={`flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-charcoal-light ${
                      selected?.id === msg.id ? "bg-gold/10" : ""
                    } ${!msg.read ? "border-l-2 border-gold" : ""}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {msg.read ? (
                        <MailOpen size={18} className="text-muted" />
                      ) : (
                        <Mail size={18} className="text-gold" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`truncate font-medium ${msg.read ? "text-cream/80" : "text-cream"}`}>
                          {msg.name}
                        </span>
                        <span className="shrink-0 text-xs text-muted">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="truncate text-sm text-muted">{msg.message}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-sm border border-gold/10 bg-charcoal-light p-6">
          {selected ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-semibold text-cream">{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} className="text-sm text-gold hover:underline">
                    {selected.email}
                  </a>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!selected.read && (
                    <button
                      onClick={() => markRead(selected.id, true)}
                      className="rounded-sm bg-green-500/15 p-2 text-green-400 hover:bg-green-500/25"
                      title="Mark read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="rounded-sm bg-red-500/15 p-2 text-red-400 hover:bg-red-500/25"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="mt-6 leading-relaxed whitespace-pre-wrap text-cream/90">{selected.message}</p>
              <a
                href={`mailto:${selected.email}?subject=Re: Deli Grill Inquiry`}
                className="mt-6 inline-block rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-charcoal hover:bg-gold-light"
              >
                Reply via Email
              </a>
            </>
          ) : (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-muted">
              <Mail size={40} className="mb-4 opacity-30" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
