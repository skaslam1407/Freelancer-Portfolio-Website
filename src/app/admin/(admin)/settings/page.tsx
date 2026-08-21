"use client";

import { useState } from "react";
import { Heading, Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea } from "@/components";
import { Loader2, Save, User, Mail, Globe, Shield, Key } from "lucide-react";
import { useToast } from "@/components/Toast";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "seo", label: "SEO", icon: Globe },
  { id: "security", label: "Security", icon: Shield },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToast();

  const [profile, setProfile] = useState({
    display_name: "John Developer",
    headline: "Senior Full-Stack Developer",
    bio: "Building scalable web applications with modern technology.",
    avatar_url: "",
    resume_url: "",
  });

  const [contact, setContact] = useState({
    contact_email: "hello@example.com",
    contact_phone: "+1 (555) 123-4567",
    address: "San Francisco, CA",
    social_links: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" },
    availability_text: "Available for freelance projects",
  });

  const [seo, setSeo] = useState({
    site_title: "Developer Portfolio",
    site_description: "Senior Full-Stack Developer specializing in React, Next.js, TypeScript, and cloud-native architectures.",
    og_image: "",
    twitter_handle: "@developer",
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addToast({ title: "Settings saved", type: "success" });
    } catch {
      addToast({ title: "Failed to save", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return (
          <Card variant="outlined" padding="lg">
            <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
            <CardContent className="pt-0 space-y-6">
              <Input label="Display Name" value={profile.display_name} onChange={(e) => setProfile(p => ({ ...p, display_name: e.target.value }))} />
              <Input label="Headline" value={profile.headline} onChange={(e) => setProfile(p => ({ ...p, headline: e.target.value }))} />
              <Textarea label="Bio" value={profile.bio} onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))} rows={4} />
              <Input label="Avatar URL" type="url" value={profile.avatar_url} onChange={(e) => setProfile(p => ({ ...p, avatar_url: e.target.value }))} />
              <Input label="Resume URL" type="url" value={profile.resume_url} onChange={(e) => setProfile(p => ({ ...p, resume_url: e.target.value }))} />
            </CardContent>
          </Card>
        );
      case "contact":
        return (
          <Card variant="outlined" padding="lg">
            <CardHeader><CardTitle>Contact & Social</CardTitle></CardHeader>
            <CardContent className="pt-0 space-y-6">
              <Input label="Contact Email" type="email" value={contact.contact_email} onChange={(e) => setContact(c => ({ ...c, contact_email: e.target.value }))} />
              <Input label="Contact Phone" value={contact.contact_phone} onChange={(e) => setContact(c => ({ ...c, contact_phone: e.target.value }))} />
              <Input label="Address" value={contact.address} onChange={(e) => setContact(c => ({ ...c, address: e.target.value }))} />
              <Input label="GitHub URL" type="url" value={contact.social_links?.github ?? ""} onChange={(e) => setContact(c => ({ ...c, social_links: { ...c.social_links, github: e.target.value } }))} />
              <Input label="LinkedIn URL" type="url" value={contact.social_links?.linkedin ?? ""} onChange={(e) => setContact(c => ({ ...c, social_links: { ...c.social_links, linkedin: e.target.value } }))} />
              <Input label="Twitter URL" type="url" value={contact.social_links?.twitter ?? ""} onChange={(e) => setContact(c => ({ ...c, social_links: { ...c.social_links, twitter: e.target.value } }))} />
              <Textarea label="Availability Text" value={contact.availability_text} onChange={(e) => setContact(c => ({ ...c, availability_text: e.target.value }))} rows={3} />
            </CardContent>
          </Card>
        );
      case "seo":
        return (
          <Card variant="outlined" padding="lg">
            <CardHeader><CardTitle>SEO Defaults</CardTitle></CardHeader>
            <CardContent className="pt-0 space-y-6">
              <Input label="Site Title" value={seo.site_title} onChange={(e) => setSeo(s => ({ ...s, site_title: e.target.value }))} />
              <Textarea label="Site Description" value={seo.site_description} onChange={(e) => setSeo(s => ({ ...s, site_description: e.target.value }))} rows={3} />
              <Input label="Default OG Image URL" type="url" value={seo.og_image} onChange={(e) => setSeo(s => ({ ...s, og_image: e.target.value }))} />
              <Input label="Twitter Handle" value={seo.twitter_handle} onChange={(e) => setSeo(s => ({ ...s, twitter_handle: e.target.value }))} />
            </CardContent>
          </Card>
        );
      case "security":
        return (
          <Card variant="outlined" padding="lg">
            <CardHeader><CardTitle>Security</CardTitle></CardHeader>
            <CardContent className="pt-0 space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                <Button variant="outline" size="sm"><Key className="mr-2 h-4 w-4" />Update Password</Button>
              </div>
              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                <p className="text-muted-foreground mb-4">Add an extra layer of security to your account.</p>
                <Button variant="outline"><Shield className="mr-2 h-4 w-4" />Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <Heading level={1} variant="display" className="mb-2">Settings</Heading>
        <p className="text-muted-foreground">Manage your site configuration and preferences</p>
      </div>

      <div className="flex gap-2 border-b mb-6">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className="h-10 px-4 gap-2"
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {renderTab()}

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}