"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Leaf, Users, Gift } from "lucide-react";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [userType, setUserType] = useState<"giver" | "receiver">("receiver");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, signup } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(loginEmail, loginPassword);
      onSuccess?.();
    } catch (err: any) {
      setError(
        "Нэвтрэх явцад алдаа гарлаа. И-мэйл эсвэл нууц үгээ шалгана уу."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signup(signupEmail, signupPassword, signupName, userType);
      onSuccess?.();
    } catch (err: any) {
      console.error("Signup error in component:", err);
      if (err.code === "auth/email-already-in-use") {
        setError(
          "Энэ и-мэйл хаяг аль хэдийн бүртгэгдсэн байна. Нэвтрэх tab-ыг ашиглана уу."
        );
      } else if (err.code === "auth/weak-password") {
        setError("Нууц үг хэт сул байна. Дор хаяж 6 тэмдэгт ашиглана уу.");
      } else if (err.code === "auth/invalid-email") {
        setError("И-мэйл хаягийн формат буруу байна.");
      } else {
        setError("Бүртгүүлэх явцад алдаа гарлаа. Дахин оролдоно уу.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl text-green-800 mb-2">FoodShare</h1>
          <p className="text-lg text-green-700 mb-4">Хог хоолыг амилуулъя</p>
          <p className="text-gray-600 text-sm">
            Хоолны хогийг бууруулж, нийгмээ дэмжье
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-green-700">
              Тавтай морил
            </CardTitle>
            <CardDescription className="text-center">
              Хоол хуваалцах нийгэмлэгт нэгдээрэй
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Нэвтрэх</TabsTrigger>
                <TabsTrigger value="signup">Бүртгүүлэх</TabsTrigger>
              </TabsList>

              {error && (
                <Alert className="mt-4 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">И-мэйл</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="И-мэйл хаягаа оруулна уу"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Нууц үг</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Нууц үгээ оруулна уу"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Бүтэн нэр</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="Бүтэн нэрээ оруулна уу"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">И-мэйл</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="И-мэйл хаягаа оруулна уу"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Нууц үг</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Нууц үг үүсгэнэ үү"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Би хүсэж байна...</Label>
                    <Select
                      value={userType}
                      onValueChange={(value: "giver" | "receiver") =>
                        setUserType(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receiver">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Хоол олох (Хүлээн авагч)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="giver">
                          <div className="flex items-center space-x-2">
                            <Gift className="w-4 h-4" />
                            <span>Хоол хуваалцах (Өгөгч)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Бүртгэл үүсгэж байна..." : "Бүртгэл үүсгэх"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <Gift className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Илүүдэл хоол хуваалцах</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Нийгмээ дэмжих</p>
          </div>
        </div>
      </div>
    </div>
  );
};
