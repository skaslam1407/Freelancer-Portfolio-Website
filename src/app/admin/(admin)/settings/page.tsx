"use client";

import { useState, useEffect } from "react";
import { Heading, Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea } from "@/components";
import { Loader2, Save, User, Mail, Globe, Shield, Key, Image, Upload, Loader } from "lucide-react";
import { useToast } from "@/components/Toast";
import { MediaUploader } from "@/components/MediaUploader";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "seo", label: "SEO", icon: Globe },
  { id: "branding", label: "Branding", icon: Image },
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

  const [branding, setBranding] = useState({
    logo_light: "",
    logo_dark: "",
    favicon: "",
    site_name: "Portfolio",
    primary_color: "#0f172a",
    accent_color: "#0f172a",
    theme_preset: "slate",
  });

  const themePresets = [
    { name: "Slate", primary: "#0f172a", accent: "#0f172a", id: "slate" },
    { name: "Blue", primary: "#1e3a5f", accent: "#2563eb", id: "blue" },
    { name: "Emerald", primary: "#064e3b", accent: "#059669", id: "emerald" },
    { name: "Violet", primary: "#3b0764", accent: "#7c3aed", id: "violet" },
    { name: "Rose", primary: "#7f1d1d", accent: "#e11d48", id: "rose" },
    { name: "Amber", primary: "#78350f", accent: "#d97706", id: "amber" },
    { name: "Cyan", primary: "#164e63", accent: "#0891b2", id: "cyan" },
    { name: "Indigo", primary: "#2d1b4e", accent: "#4f46e5", id: "indigo" },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const { data } = await res.json();
        if (data) {
          if (data.seo_defaults) {
            setSeo(s => ({ ...s, ...data.seo_defaults }));
          }
          if (data.branding) setBranding(b => ({ ...b, ...data.branding }));
          if (data.contact_email) setContact(c => ({ ...c, contact_email: data.contact_email }));
          if (data.contact_phone) setContact(c => ({ ...c, contact_phone: data.contact_phone }));
          if (data.address) setContact(c => ({ ...c, address: data.address }));
          if (data.social_links) setContact(c => ({ ...c, social_links: { ...c.social_links, ...data.social_links } }));
          if (data.availability_text) setContact(c => ({ ...c, availability_text: data.availability_text }));
        }
      }
    } catch {
      // ignore
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_title: seo.site_title,
          site_description: seo.site_description,
          og_image: seo.og_image,
          twitter_handle: seo.twitter_handle,
          branding: {
            ...branding,
            primary_color: branding.primary_color,
            accent_color: branding.accent_color,
            theme_preset: branding.theme_preset,
          },
          contact_email: contact.contact_email,
          contact_phone: contact.contact_phone,
          address: contact.address,
          social_links: contact.social_links,
          availability_text: contact.availability_text,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save");
      }

      addToast({ title: "Settings saved", type: "success" });
    } catch (err: any) {
      addToast({ title: "Failed to save", description: err.message, type: "error" });
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
      case "branding":
        return (
          <Card variant="outlined" padding="lg">
            <CardHeader><CardTitle>Branding</CardTitle></CardHeader>
            <CardContent className="pt-0 space-y-6">
              <Input label="Site Name" value={branding.site_name} onChange={(e) => setBranding(b => ({ ...b, site_name: e.target.value }))} />

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Theme Preset</label>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {themePresets.map((preset) => (
                      <Button
                        key={preset.id}
                        variant={branding.theme_preset === preset.id ? "default" : "outline"}
                        className="h-20 flex-col gap-2 px-4"
                        onClick={() => setBranding(b => ({ ...b, theme_preset: preset.id, primary_color: preset.primary, accent_color: preset.accent }))}
                        style={{ borderColor: preset.primary }}
                      >
                        <div
                          className="w-full h-8 rounded-lg"
                          style={{ background: `linear-gradient(135deg, ${preset.primary} 0%, ${preset.accent} 100%)` }}
                        />
                        <span className="text-sm font-medium">{preset.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium mb-3">Custom Primary Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={branding.primary_color}
                      onChange={(e) => setBranding(b => ({ ...b, primary_color: e.target.value, theme_preset: "custom" }))}
                      className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                    />
                    <Input
                      value={branding.primary_color}
                      onChange={(e) => setBranding(b => ({ ...b, primary_color: e.target.value, theme_preset: "custom" }))}
                      placeholder="#0f172a"
                      className="max-w-xs font-mono text-sm"
                    />
                    <span className="text-sm text-muted-foreground">Used for buttons, links, headings</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Custom Accent Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={branding.accent_color}
                      onChange={(e) => setBranding(b => ({ ...b, accent_color: e.target.value, theme_preset: "custom" }))}
                      className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                    />
                    <Input
                      value={branding.accent_color}
                      onChange={(e) => setBranding(b => ({ ...b, accent_color: e.target.value, theme_preset: "custom" }))}
                      placeholder="#0f172a"
                      className="max-w-xs font-mono text-sm"
                    />
                    <span className="text-sm text-muted-foreground">Used for hover states, borders, highlights</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium mb-3">Light Mode Logo</label>
                  <MediaUploader
                    onUploadComplete={(files) => {
                      if (files.length > 0) {
                        setBranding(b => ({ ...b, logo_light: files[0].storage_path }));
                      }
                    }}
                    maxFiles={1}
                    maxFileSize={5}
                    acceptedTypes={["image/svg+xml", "image/png", "image/webp"]}
                  />
                  {branding.logo_light && (
                    <p className="mt-2 text-sm text-muted-foreground">Current: {branding.logo_light}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Dark Mode Logo</label>
                  <MediaUploader
                    onUploadComplete={(files) => {
                      if (files.length > 0) {
                        setBranding(b => ({ ...b, logo_dark: files[0].storage_path }));
                      }
                    }}
                    maxFiles={1}
                    maxFileSize={5}
                    acceptedTypes={["image/svg+xml", "image/png", "image/webp"]}
                  />
                  {branding.logo_dark && (
                    <p className="mt-2 text-sm text-muted-foreground">Current: {branding.logo_dark}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Favicon</label>
                  <MediaUploader
                    onUploadComplete={(files) => {
                      if (files.length > 0) {
                        setBranding(b => ({ ...b, favicon: files[0].storage_path }));
                      }
                    }}
                    maxFiles={1}
                    maxFileSize={1}
                    acceptedTypes={["image/svg+xml", "image/png", "image/x-icon", "image/vnd.microsoft.icon"]}
                  />
                  {branding.favicon && (
                    <div className="mt-2 flex items-center gap-4">
                      <p className="text-sm text-muted-foreground">Current: {branding.favicon}</p>
                      <a
                        href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio-media/${branding.favicon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Preview
                      </a>
                    </div>
                  )}
                </div>
              </div>
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