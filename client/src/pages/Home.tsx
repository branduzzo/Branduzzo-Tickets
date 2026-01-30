import { useState } from "react";
import { useGenerateBot } from "@/hooks/use-generate";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bot, 
  Server, 
  FileCode, 
  Play, 
  Download, 
  CheckCircle2, 
  Terminal,
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [botName, setBotName] = useState("");
  const [token, setToken] = useState("");

  const generateMutation = useGenerateBot();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botName.trim() || !token.trim()) return;

    generateMutation.mutate({
      botName,
      token
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <Section className="pt-20 pb-12 text-center" delay={0.1}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Discord Bot Generator</span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
          Branduzzo's Tickets
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create your own professional Discord Ticket Bot in seconds. 
          No coding knowledge required, just configure and launch.
        </p>
      </Section>

      {/* Generator Section */}
      <Section delay={0.2} className="py-8">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl shadow-black/20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
          <CardContent className="p-8 md:p-10">
            <div className="grid lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-primary" />
                    Configure Your Bot
                  </h2>
                  <p className="text-muted-foreground">
                    Enter your bot details below to generate the custom python script.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="space-y-3">
                    <Label htmlFor="botName" className="text-base font-medium">Bot Name</Label>
                    <Input
                      id="botName"
                      placeholder="e.g. SuperSupport Bot"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      className="h-12 bg-secondary/50 border-border/50 focus:border-primary/50 text-lg transition-all"
                    />
                    <p className="text-xs text-muted-foreground">
                      This will replace the placeholder in the code.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="token" className="text-base font-medium">Discord Token</Label>
                    <Input
                      id="token"
                      type="password"
                      placeholder="MTA..."
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      className="h-12 bg-secondary/50 border-border/50 focus:border-primary/50 text-lg font-mono transition-all"
                    />
                    <p className="text-xs text-muted-foreground">
                      Your token is safe. It is injected directly into your download file.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={generateMutation.isPending || !botName || !token}
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-primary/20 rounded-xl"
                    >
                      {generateMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Download className="w-5 h-5" />
                          Download main.py
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-center">
                <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Included Features
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Ticket System with Categories",
                      "Transcript Generation",
                      "Staff Claiming System",
                      "Customizable Questions",
                      "Automatic Channel Management",
                      "Log System Integration"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Guide Section */}
      <Section delay={0.4} className="pb-24">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Setup Guide</h2>
          <p className="text-muted-foreground">Follow these simple steps to get your bot online.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <GuideCard 
            icon={<Bot className="w-6 h-6 text-primary" />}
            title="1. Create Application"
            step="01"
          >
            <p className="text-muted-foreground mb-4">
              Go to the <a href="https://discord.com/developers/applications" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Discord Developer Portal <ExternalLink className="w-3 h-3"/></a>. Create a new application, go to the "Bot" tab, and copy your token.
            </p>
            <div className="bg-secondary/50 p-3 rounded-lg border border-border/50 text-sm">
              <strong className="text-primary block mb-1">Important:</strong>
              Enable "Server Members Intent" and "Message Content Intent" under the Gateway Intents section.
            </div>
          </GuideCard>

          <GuideCard 
            icon={<Server className="w-6 h-6 text-accent" />}
            title="2. Hosting Setup"
            step="02"
          >
            <p className="text-muted-foreground mb-4">
              Register on a Python hosting service like <a href="https://zampto.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Zampto <ExternalLink className="w-3 h-3"/></a>. Create a new Server/Container and select Python as the language.
            </p>
          </GuideCard>

          <GuideCard 
            icon={<FileCode className="w-6 h-6 text-blue-400" />}
            title="3. Upload Files"
            step="03"
          >
            <p className="text-muted-foreground mb-3">
              Create a file named <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground font-mono text-xs">requirements.txt</code> and add the following line:
            </p>
            <div className="bg-secondary/80 p-3 rounded-md font-mono text-sm text-foreground mb-4">
              discord.py
            </div>
            <p className="text-muted-foreground">
              Then upload the <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground font-mono text-xs">main.py</code> file you just downloaded. You may need to update the startup command in your host's settings to run this file.
            </p>
          </GuideCard>

          <GuideCard 
            icon={<Play className="w-6 h-6 text-green-400" />}
            title="4. Launch & Configure"
            step="04"
          >
            <p className="text-muted-foreground mb-3">
              Start the bot! Once online in your server, run the setup command:
            </p>
            <div className="bg-secondary/80 p-3 rounded-md font-mono text-xs md:text-sm text-foreground overflow-x-auto whitespace-nowrap scrollbar-hide">
              <span className="text-primary">/support</span> channel category_open category_closed logs_channel staff_role
            </div>
          </GuideCard>
        </div>
      </Section>
      
    </div>
  );
} 

function GuideCard({ icon, title, step, children }: { icon: React.ReactNode; title: string; step: string; children: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-card border border-border/50 rounded-xl p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 font-bold text-6xl select-none group-hover:opacity-10 transition-opacity">
        {step}
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-secondary/50 rounded-lg border border-border/50 group-hover:border-primary/30 transition-colors">
          {icon}
        </div>
        <h3 className="font-bold text-xl">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}
