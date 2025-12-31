import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  validatePassword,
  sendMessageApi,
  getMessageApi,
  deleteMessageApi,
  signUp,
} from "../db/chat";
import { Textarea } from "@/components/ui/textarea";
import { stringLimit } from "@/db/db";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const Chat = () => {
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState("");

  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [otherPassword, setOtherPassword] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);

  const checkMessages = async (otherPassword: string) => {
    setMessageLoading(true);
    const msg = await getMessageApi(password);
    const sentMessage = await getMessageApi(otherPassword);
    if (sentMessage !== "empty" && sentMessage) {
      setMaxLength(stringLimit - sentMessage.length);
    }
    setMessageLoading(false);

    if (msg !== "empty" && msg) {
      setMessage(msg);

      setTimeout(async () => {
        setMessage("");
        await deleteMessageApi(password);
      }, 30000);
    }
  };

  /* Password check on submit */
  const handleLogin = async () => {
    setLoginLoading(true);
    const otherPassword = await validatePassword(password);
    setLoginLoading(false);

    if (!otherPassword) {
      setError("Password is wrong");
      return;
    }
    setOtherPassword(otherPassword);

    setIsAuthed(true);
    setError("");
    checkMessages(otherPassword);
  };

  const [sendLoading, setSendLoading] = useState(false);

  /* Send message */
  const handleSend = async () => {
    if (!input.trim()) return;
    setSendLoading(true);
    const messageLength = await sendMessageApi(input, otherPassword);
    setMaxLength((maxLength) => maxLength - (messageLength || 0));
    setSendLoading(false);
    setInput("");
  };
  const [passwords, setPasswords] = useState<[string, string]>(["", ""]);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const handleSignUp = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (!passwords[0] || !passwords[1]) {
      toast.error("Please enter both passwords");
      return;
    }
    try {
      setSignUpLoading(true);
      await signUp(passwords[0], passwords[1]);
      setSignUpLoading(false);
      setPasswords(["", ""]);
      setSignUpOpen(false);
      toast.success("Sign up successful");
    } catch (e) {
      toast.error(JSON.stringify(e));
    }
  };
  const [maxLength, setMaxLength] = useState(stringLimit);

  return (
    <div
      className={`flex relative items-center justify-center min-h-screen ${
        isAuthed ? `bg-cover bg-center bg-[url('/bg1.jpg')]` : "bg-muted"
      }`}
    >
      {isAuthed ? null : (
        <div className="absolute top-4 right-4">
          <Dialog open={signUpOpen} onOpenChange={setSignUpOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create an Account</DialogTitle>
                <DialogDescription>
                  Enter your details to sign up.
                </DialogDescription>
              </DialogHeader>

              <form className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="hispassword" className="text-sm font-medium">
                    His Password
                  </label>
                  <Input
                    disabled={signUpLoading}
                    id="hispassword"
                    type="password"
                    placeholder="His Password"
                    value={passwords[0]}
                    onChange={(e) =>
                      setPasswords((passwords) => [
                        e?.target?.value || "",
                        passwords[1],
                      ])
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSignUp(e);
                      }
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="herpassword" className="text-sm font-medium">
                    Her Password
                  </label>

                  <Input
                    disabled={signUpLoading}
                    id="herpassword"
                    type="password"
                    placeholder="Her Password"
                    value={passwords[1]}
                    onChange={(e) =>
                      setPasswords((passwords) => [
                        passwords[0],
                        e?.target?.value || "",
                      ])
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSignUp(e);
                      }
                    }}
                  />
                </div>
              </form>

              <DialogFooter className="">
                <Button loading={signUpLoading} onClick={handleSignUp}>
                  Sign Up
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Secure Chat</CardTitle>
            {isAuthed ? (
              <Button
                loading={sendLoading || messageLoading}
                onClick={() => checkMessages(otherPassword)}
                variant="secondary"
                size="sm"
              >
                Check for messages
              </Button>
            ) : null}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {!isAuthed ? (
            <>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                loading={loginLoading}
                onClick={handleLogin}
                className="w-full"
              >
                Login
              </Button>
            </>
          ) : (
            <>
              {messageLoading ? (
                <div className="w-full h-20 flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  {message && (
                    <div>
                      <div className="rounded-md bg-secondary p-3 text-sm">
                        {message.split("}}").map((msg) => {
                          return <div key={msg}>{msg}</div>;
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground pt-1 pl-2">
                        Message auto-deletes 30 seconds after seen
                      </p>
                    </div>
                  )}
                </>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Textarea
                    disabled={sendLoading || messageLoading}
                    id="message"
                    placeholder="Type your message here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    maxLength={maxLength} // HTML attribute prevents typing beyond limit
                    rows={4}
                    className="resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                  />

                  <p className="text-xs text-muted-foreground text-right">
                    {input.length}/{maxLength}
                  </p>
                </div>
                <Button
                  loading={sendLoading || messageLoading}
                  onClick={handleSend}
                >
                  Send
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
