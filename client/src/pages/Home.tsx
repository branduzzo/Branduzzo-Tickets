import { useState } from "react";
import { useGenerateBot } from "@/hooks/use-generate";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Bot, 
  Server, 
  FileCode, 
  Play, 
  Download, 
  CheckCircle2, 
  Terminal,
  ExternalLink,
  Sparkles,
  Globe,
  Gamepad2
} from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { motion } from "framer-motion";
import type { Language } from "@shared/schema";

const translations = {
  en: {
    badge: "Discord Bot Generator",
    title: "Branduzzo's Tickets",
    subtitle: "Create your own professional Discord Ticket Bot in seconds. No coding knowledge required, just configure and launch.",
    configureTitle: "Configure Your Bot",
    configureSubtitle: "Enter your bot details below to generate the custom python script.",
    language: "Language",
    languagePlaceholder: "Select language",
    botName: "Bot Name",
    botNamePlaceholder: "e.g. SuperSupport Bot",
    botNameHint: "This will replace the placeholder in the code.",
    token: "Discord Token",
    tokenPlaceholder: "MTA...",
    tokenHint: "Your token is safe. It is injected directly into your download file.",
    generating: "Generating...",
    download: "Download main.py",
    features: "Included Features",
    featuresList: [
      "Ticket System with Categories",
      "Transcript Generation",
      "Staff Claiming System",
      "Customizable Questions",
      "Automatic Channel Management",
      "Log System Integration"
    ],
    guideTitle: "Setup Guide",
    guideSubtitle: "Follow these simple steps to get your bot online.",
    step1Title: "1. Create Application",
    step1Content: "Go to the",
    step1Link: "Discord Developer Portal",
    step1After: ". Create a new application, go to the \"Bot\" tab, and copy your token.",
    step1Important: "Important:",
    step1ImportantText: "Enable \"Server Members Intent\" and \"Message Content Intent\" under the Privileged Gateway Intents section.",
    step2Title: "2. Hosting Setup",
    step2Content: "Register on a Python hosting service like",
    step2After: ". Create a new Server/Container and select Python as the language.",
    step3Title: "3. Upload Files",
    step3Content1: "Create a file named",
    step3Content2: "and add the following line:",
    step3Content3: "Then upload the",
    step3Content4: "file you just downloaded. You may need to update the startup command in your host's settings to run this file.",
    step4Title: "4. Launch & Configure",
    step4Content: "Start the bot! Once online in your server, run the setup command:",
    sponsors: "Sponsors",
    sponsorsSubtitle: "Check out our amazing partner servers!",
    smpLabel: "SMP",
    buildffaLabel: "BuildFFA",
    survivalLabel: "Survival",
    boxpvpLabel: "BoxPvP"
  },
  it: {
    badge: "Generatore Bot Discord",
    title: "Branduzzo's Tickets",
    subtitle: "Crea il tuo Bot Ticket Discord professionale in pochi secondi. Non serve saper programmare, configura e avvia.",
    configureTitle: "Configura il Tuo Bot",
    configureSubtitle: "Inserisci i dettagli del bot qui sotto per generare lo script python personalizzato.",
    language: "Lingua",
    languagePlaceholder: "Seleziona lingua",
    botName: "Nome Bot",
    botNamePlaceholder: "es. SuperSupport Bot",
    botNameHint: "Questo sostituirà il placeholder nel codice.",
    token: "Token Discord",
    tokenPlaceholder: "MTA...",
    tokenHint: "Il tuo token è al sicuro. Viene inserito direttamente nel file scaricato.",
    generating: "Generazione...",
    download: "Scarica main.py",
    features: "Funzionalità Incluse",
    featuresList: [
      "Sistema Ticket con Categorie",
      "Generazione Transcript",
      "Sistema Claim per Staff",
      "Domande Personalizzabili",
      "Gestione Automatica Canali",
      "Integrazione Sistema Log"
    ],
    guideTitle: "Guida alla Configurazione",
    guideSubtitle: "Segui questi semplici passaggi per mettere online il tuo bot.",
    step1Title: "1. Crea Applicazione",
    step1Content: "Vai al",
    step1Link: "Discord Developer Portal",
    step1After: ". Crea una nuova applicazione, vai nella scheda \"Bot\" e copia il tuo token.",
    step1Important: "Importante:",
    step1ImportantText: "Abilita \"Server Members Intent\" e \"Message Content Intent\" nella sezione Privileged Gateway Intents.",
    step2Title: "2. Configurazione Hosting",
    step2Content: "Registrati su un servizio di hosting Python come",
    step2After: ". Crea un nuovo Server/Container e seleziona Python come linguaggio.",
    step3Title: "3. Carica i File",
    step3Content1: "Crea un file chiamato",
    step3Content2: "e aggiungi la seguente riga:",
    step3Content3: "Poi carica il file",
    step3Content4: "appena scaricato. Potrebbe essere necessario aggiornare il comando di avvio nelle impostazioni del tuo host.",
    step4Title: "4. Avvia e Configura",
    step4Content: "Avvia il bot! Una volta online nel tuo server, esegui il comando di setup:",
    sponsors: "Sponsor",
    sponsorsSubtitle: "Scopri i nostri fantastici server partner!",
    smpLabel: "SMP",
    buildffaLabel: "BuildFFA",
    survivalLabel: "Survival",
    boxpvpLabel: "BoxPvP"
  },
  es: {
    badge: "Generador de Bot Discord",
    title: "Branduzzo's Tickets",
    subtitle: "Crea tu propio Bot de Tickets Discord profesional en segundos. No se requieren conocimientos de programación, solo configura y lanza.",
    configureTitle: "Configura Tu Bot",
    configureSubtitle: "Ingresa los detalles de tu bot a continuación para generar el script python personalizado.",
    language: "Idioma",
    languagePlaceholder: "Seleccionar idioma",
    botName: "Nombre del Bot",
    botNamePlaceholder: "ej. SuperSupport Bot",
    botNameHint: "Esto reemplazará el marcador en el código.",
    token: "Token de Discord",
    tokenPlaceholder: "MTA...",
    tokenHint: "Tu token está seguro. Se inyecta directamente en tu archivo descargado.",
    generating: "Generando...",
    download: "Descargar main.py",
    features: "Características Incluidas",
    featuresList: [
      "Sistema de Tickets con Categorías",
      "Generación de Transcripción",
      "Sistema de Reclamación para Staff",
      "Preguntas Personalizables",
      "Gestión Automática de Canales",
      "Integración de Sistema de Logs"
    ],
    guideTitle: "Guía de Configuración",
    guideSubtitle: "Sigue estos simples pasos para poner tu bot en línea.",
    step1Title: "1. Crear Aplicación",
    step1Content: "Ve al",
    step1Link: "Portal de Desarrolladores de Discord",
    step1After: ". Crea una nueva aplicación, ve a la pestaña \"Bot\" y copia tu token.",
    step1Important: "Importante:",
    step1ImportantText: "Habilita \"Server Members Intent\" y \"Message Content Intent\" en la sección Privileged Gateway Intents.",
    step2Title: "2. Configuración de Hosting",
    step2Content: "Regístrate en un servicio de hosting Python como",
    step2After: ". Crea un nuevo Servidor/Contenedor y selecciona Python como lenguaje.",
    step3Title: "3. Subir Archivos",
    step3Content1: "Crea un archivo llamado",
    step3Content2: "y agrega la siguiente línea:",
    step3Content3: "Luego sube el archivo",
    step3Content4: "que acabas de descargar. Es posible que necesites actualizar el comando de inicio en la configuración de tu host.",
    step4Title: "4. Lanzar y Configurar",
    step4Content: "¡Inicia el bot! Una vez en línea en tu servidor, ejecuta el comando de configuración:",
    sponsors: "Patrocinadores",
    sponsorsSubtitle: "¡Descubre nuestros increíbles servidores asociados!",
    smpLabel: "SMP",
    buildffaLabel: "BuildFFA",
    survivalLabel: "Survival",
    boxpvpLabel: "BoxPvP"
  }
};

const languageNames = {
  en: "English",
  it: "Italiano",
  es: "Español"
};

export default function Home() {
  const [botName, setBotName] = useState("");
  const [token, setToken] = useState("");
  const [language, setLanguage] = useState<Language>("en");

  const t = translations[language];
  const generateMutation = useGenerateBot();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botName.trim() || !token.trim()) return;

    generateMutation.mutate({
      botName,
      token,
      language
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
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
          <span>{t.badge}</span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </Section>

      <Section delay={0.2} className="py-8">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl shadow-black/20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
          <CardContent className="p-8 md:p-10">
            <div className="grid lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-primary" />
                    {t.configureTitle}
                  </h2>
                  <p className="text-muted-foreground">
                    {t.configureSubtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="space-y-3">
                    <Label htmlFor="language" className="text-base font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {t.language}
                    </Label>
                    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                      <SelectTrigger 
                        id="language"
                        className="h-12 bg-secondary/50 border-border/50 focus:border-primary/50 text-lg transition-all"
                        data-testid="select-language"
                      >
                        <SelectValue placeholder={t.languagePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en" data-testid="option-language-en">
                          <span className="flex items-center gap-2">English</span>
                        </SelectItem>
                        <SelectItem value="it" data-testid="option-language-it">
                          <span className="flex items-center gap-2">Italiano</span>
                        </SelectItem>
                        <SelectItem value="es" data-testid="option-language-es">
                          <span className="flex items-center gap-2">Español</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="botName" className="text-base font-medium">{t.botName}</Label>
                    <Input
                      id="botName"
                      placeholder={t.botNamePlaceholder}
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      className="h-12 bg-secondary/50 border-border/50 focus:border-primary/50 text-lg transition-all"
                      data-testid="input-bot-name"
                    />
                    <p className="text-xs text-muted-foreground">
                      {t.botNameHint}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="token" className="text-base font-medium">{t.token}</Label>
                    <Input
                      id="token"
                      type="password"
                      placeholder={t.tokenPlaceholder}
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      className="h-12 bg-secondary/50 border-border/50 focus:border-primary/50 text-lg font-mono transition-all"
                      data-testid="input-token"
                    />
                    <p className="text-xs text-muted-foreground">
                      {t.tokenHint}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={generateMutation.isPending || !botName || !token}
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-primary/20 rounded-xl"
                      data-testid="button-download"
                    >
                      {generateMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t.generating}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Download className="w-5 h-5" />
                          {t.download}
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
                    {t.features}
                  </h3>
                  <ul className="space-y-3">
                    {t.featuresList.map((feature, i) => (
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

      <Section delay={0.4} className="pb-16">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t.guideTitle}</h2>
          <p className="text-muted-foreground">{t.guideSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <GuideCard 
            icon={<Bot className="w-6 h-6 text-primary" />}
            title={t.step1Title}
            step="01"
          >
            <p className="text-muted-foreground mb-4">
              {t.step1Content} <a href="https://discord.com/developers/applications" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">{t.step1Link} <ExternalLink className="w-3 h-3"/></a>{t.step1After}
            </p>
            <div className="bg-secondary/50 p-3 rounded-lg border border-border/50 text-sm">
              <strong className="text-primary block mb-1">{t.step1Important}</strong>
              {t.step1ImportantText}
            </div>
          </GuideCard>

          <GuideCard 
            icon={<Server className="w-6 h-6 text-accent" />}
            title={t.step2Title}
            step="02"
          >
            <p className="text-muted-foreground mb-4">
              {t.step2Content} <a href="https://zampto.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Zampto <ExternalLink className="w-3 h-3"/></a>{t.step2After}
            </p>
          </GuideCard>

          <GuideCard 
            icon={<FileCode className="w-6 h-6 text-blue-400" />}
            title={t.step3Title}
            step="03"
          >
            <p className="text-muted-foreground mb-3">
              {t.step3Content1} <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground font-mono text-xs">requirements.txt</code> {t.step3Content2}
            </p>
            <div className="bg-secondary/80 p-3 rounded-md font-mono text-sm text-foreground mb-4">
              discord.py
            </div>
            <p className="text-muted-foreground">
              {t.step3Content3} <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground font-mono text-xs">main.py</code> {t.step3Content4}
            </p>
          </GuideCard>

          <GuideCard 
            icon={<Play className="w-6 h-6 text-green-400" />}
            title={t.step4Title}
            step="04"
          >
            <p className="text-muted-foreground mb-3">
              {t.step4Content}
            </p>
            <div className="bg-secondary/80 p-3 rounded-md font-mono text-xs md:text-sm text-foreground overflow-x-auto whitespace-nowrap scrollbar-hide">
              <span className="text-primary">/support</span> channel category_open category_closed logs_channel staff_role
            </div>
          </GuideCard>
        </div>
      </Section>

      <Section delay={0.5} className="pb-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t.sponsors}</h2>
          <p className="text-muted-foreground">{t.sponsorsSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <a 
            href="https://discord.gg/6crHbcxTEq" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
            data-testid="link-sponsor-trility"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-card border border-border/50 rounded-xl p-6 relative overflow-hidden hover-elevate"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Gamepad2 className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl group-hover:text-green-500 transition-colors">play.trility.eu</h3>
                  <p className="text-sm text-muted-foreground">Minecraft Server</p>
                </div>
                <SiDiscord className="w-5 h-5 text-muted-foreground ml-auto" />
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium border border-green-500/20">
                  {t.smpLabel}
                </span>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-medium border border-emerald-500/20">
                  {t.buildffaLabel}
                </span>
              </div>
            </motion.div>
          </a>

          <a 
            href="https://discord.lunarymc.it" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
            data-testid="link-sponsor-lunary"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-card border border-border/50 rounded-xl p-6 relative overflow-hidden hover-elevate"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-violet-600" />
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <Gamepad2 className="w-8 h-8 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl group-hover:text-purple-500 transition-colors">play.lunarymc.it</h3>
                  <p className="text-sm text-muted-foreground">Minecraft Server</p>
                </div>
                <SiDiscord className="w-5 h-5 text-muted-foreground ml-auto" />
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs font-medium border border-purple-500/20">
                  {t.smpLabel}
                </span>
                <span className="px-3 py-1 bg-violet-500/10 text-violet-500 rounded-full text-xs font-medium border border-violet-500/20">
                  {t.survivalLabel}
                </span>
                <span className="px-3 py-1 bg-fuchsia-500/10 text-fuchsia-500 rounded-full text-xs font-medium border border-fuchsia-500/20">
                  {t.boxpvpLabel}
                </span>
              </div>
            </motion.div>
          </a>
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
