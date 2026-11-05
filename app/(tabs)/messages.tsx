import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../../src/lib/AuthContext";
import { apiFetch } from "../../src/lib/api";
import { colors } from "../../src/theme";

type ThreadListItem = {
  id: string;
  subject: string;
  status: string;
  client: { name: string; email: string };
  _count: { messages: number };
};

type Message = {
  id: string;
  body: string;
  createdAt: string;
  sender: { name: string; role: string };
};

export default function MessagesScreen() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [threads, setThreads] = useState<ThreadListItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [subject, setSubject] = useState("");
  const [compose, setCompose] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const loadThreads = useCallback(async () => {
    const { res, data } = await apiFetch("/api/threads");
    if (res.ok) setThreads(data.threads);
  }, []);

  const loadThread = useCallback(async (id: string) => {
    const { res, data } = await apiFetch(`/api/threads/${id}`);
    if (res.ok) setMessages(data.thread.messages);
  }, []);

  useEffect(() => {
    if (!user) return;
    loadThreads();
    const t = setInterval(loadThreads, 5000);
    return () => clearInterval(t);
  }, [user, loadThreads]);

  useEffect(() => {
    if (!activeId) return;
    loadThread(activeId);
    const t = setInterval(() => loadThread(activeId), 4000);
    return () => clearInterval(t);
  }, [activeId, loadThread]);

  async function startThread() {
    if (!subject.trim() || !compose.trim()) return;
    setBusy(true);
    setError("");
    const { res, data } = await apiFetch("/api/threads", {
      method: "POST",
      body: JSON.stringify({ subject, body: compose }),
    });
    setBusy(false);
    if (!res.ok) {
      setError(data.error || "Could not create thread");
      return;
    }
    setSubject("");
    setCompose("");
    await loadThreads();
    setActiveId(data.thread.id);
  }

  async function sendReply() {
    if (!activeId || !reply.trim()) return;
    setBusy(true);
    setError("");
    const { res, data } = await apiFetch(`/api/threads/${activeId}/messages`, {
      method: "POST",
      body: JSON.stringify({ body: reply }),
    });
    setBusy(false);
    if (!res.ok) {
      setError(data.error || "Send failed");
      return;
    }
    setReply("");
    await loadThread(activeId);
    await loadThreads();
  }

  async function setStatus(next: string) {
    if (!activeId || !isAdmin) return;
    await apiFetch(`/api/threads/${activeId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: next }),
    });
    await loadThreads();
  }

  if (authLoading) {
    return (
      <View style={[styles.root, styles.center]}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.root}>
        <Text style={styles.eyebrow}>Auth required</Text>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.body}>
          Sign in on the Profile tab to open client threads or the admin inbox.
        </Text>
        <Link href="/profile" asChild>
          <Pressable style={styles.primary}>
            <Text style={styles.primaryText}>Go to Account</Text>
          </Pressable>
        </Link>
        <Link href="/contact" asChild>
          <Pressable style={styles.ghost}>
            <Text style={styles.ghostText}>Public contact form</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  if (activeId) {
    const active = threads.find((t) => t.id === activeId);
    return (
      <View style={styles.root}>
        <Pressable onPress={() => setActiveId(null)}>
          <Text style={styles.back}>← Back to {isAdmin ? "inbox" : "threads"}</Text>
        </Pressable>
        <Text style={styles.title}>{active?.subject || "Thread"}</Text>
        <Text style={styles.meta}>
          {active?.status}
          {isAdmin && active ? ` · ${active.client.name}` : ""}
        </Text>
        {isAdmin ? (
          <View style={styles.statusRow}>
            {(["NEW", "ACTIVE", "CLOSED"] as const).map((s) => (
              <Pressable key={s} style={styles.statusChip} onPress={() => setStatus(s)}>
                <Text style={styles.statusChipText}>{s}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
        <FlatList
          style={{ flex: 1, marginTop: 12 }}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.sender.role === "ADMIN" ? styles.bubbleAdmin : null,
              ]}
            >
              <Text style={styles.bubbleMeta}>
                {item.sender.name}
                {item.sender.role === "ADMIN" ? " · studio" : ""}
              </Text>
              <Text style={styles.bubbleBody}>{item.body}</Text>
            </View>
          )}
        />
        <View style={styles.composer}>
          <TextInput
            style={styles.input}
            placeholder="Write a message…"
            placeholderTextColor={colors.muted}
            value={reply}
            onChangeText={setReply}
          />
          <Pressable style={styles.send} onPress={sendReply} disabled={busy}>
            <Text style={styles.primaryText}>Send</Text>
          </Pressable>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.eyebrow}>{isAdmin ? "Admin inbox" : "Your threads"}</Text>
      <Text style={styles.title}>{isAdmin ? "Studio inbox" : "Messages"}</Text>
      <Text style={styles.body}>
        {isAdmin
          ? "All client conversations. Reply and update status here."
          : "Start a thread or continue an existing brief."}
      </Text>

      <FlatList
        style={{ marginTop: 16 }}
        data={threads}
        keyExtractor={(t) => t.id}
        ListEmptyComponent={<Text style={styles.meta}>No threads yet.</Text>}
        renderItem={({ item }) => (
          <Pressable style={styles.threadRow} onPress={() => setActiveId(item.id)}>
            <Text style={styles.threadTitle}>{item.subject}</Text>
            <Text style={styles.meta}>
              {item.status}
              {isAdmin ? ` · ${item.client.name}` : ""} · {item._count.messages} msgs
            </Text>
          </Pressable>
        )}
      />

      {!isAdmin ? (
        <View style={styles.newBox}>
          <Text style={styles.threadTitle}>New conversation</Text>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            placeholderTextColor={colors.muted}
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={[styles.input, { minHeight: 72 }]}
            placeholder="First message"
            placeholderTextColor={colors.muted}
            value={compose}
            onChangeText={setCompose}
            multiline
          />
          <Pressable style={styles.primary} onPress={startThread} disabled={busy}>
            <Text style={styles.primaryText}>Start thread</Text>
          </Pressable>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: 24 },
  center: { alignItems: "center", justifyContent: "center" },
  eyebrow: {
    color: colors.accent,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: { marginTop: 8, color: colors.ink, fontSize: 28, fontWeight: "700" },
  body: { marginTop: 12, color: colors.muted, fontSize: 15, lineHeight: 22 },
  meta: { marginTop: 4, color: colors.muted, fontSize: 12 },
  back: { color: colors.accent, fontWeight: "600", marginBottom: 8 },
  primary: {
    marginTop: 28,
    backgroundColor: colors.accent,
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
  },
  primaryText: { color: "#f8faf9", fontWeight: "700" },
  ghost: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: colors.elevated,
  },
  ghostText: { color: colors.ink, fontWeight: "600" },
  threadRow: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.elevated,
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  threadTitle: { color: colors.ink, fontWeight: "700", fontSize: 15 },
  newBox: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 12,
  },
  input: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.ink,
    backgroundColor: colors.elevated,
  },
  composer: { flexDirection: "row", gap: 8, alignItems: "center", marginTop: 8 },
  send: {
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 4,
  },
  bubble: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.elevated,
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
    maxWidth: "92%",
  },
  bubbleAdmin: { alignSelf: "flex-end", backgroundColor: "#e8f1f0" },
  bubbleMeta: { color: colors.muted, fontSize: 11 },
  bubbleBody: { marginTop: 4, color: colors.ink, fontSize: 14, lineHeight: 20 },
  statusRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  statusChip: {
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusChipText: { fontSize: 11, fontWeight: "700", color: colors.ink },
  error: { marginTop: 8, color: "#b42318", fontSize: 13 },
});
