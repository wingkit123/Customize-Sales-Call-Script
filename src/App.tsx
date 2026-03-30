import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  RefreshCcw, 
  Phone, 
  PhoneCall,
  MessageSquare, 
  Mail, 
  User, 
  Building2, 
  CheckCircle2,
  ChevronRight,
  Info,
  Clock,
  StickyNote,
  Play,
  Square
} from 'lucide-react';
import { SCRIPTS, ScriptNode } from './constants';

export default function App() {
  const [activeScriptId, setActiveScriptId] = useState<string>('script1');
  const [currentNodeId, setCurrentNodeId] = useState<string>('opening');
  const [customerName, setCustomerName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<ScriptNode[]>([]);
  const [notes, setNotes] = useState<string>('');
  
  const scriptRef = React.useRef<HTMLDivElement>(null);
  
  // Timer State
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const activeScript = SCRIPTS[activeScriptId];
  const currentNode = activeScript.nodes[currentNodeId] || activeScript.nodes[activeScript.initialNodeId];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Reset script when switching tabs
    setCurrentNodeId(activeScript.initialNodeId);
    setHistory([]);
  }, [activeScriptId]);

  const handleOptionClick = (nextNodeId: string) => {
    setHistory([...history, currentNode]);
    setCurrentNodeId(nextNodeId);
    
    // Jump back to the answer area
    if (scriptRef.current) {
      scriptRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReset = () => {
    setCurrentNodeId(activeScript.initialNodeId);
    setHistory([]);
  };

  const getPersonalizedText = (text: string) => {
    return text
      .replace(/\[Name\]/g, customerName || '[Name]')
      .replace(/\[Company\]/g, companyName || '[Company]');
  };

  const copyToClipboard = () => {
    const text = getPersonalizedText(currentNode.text);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <PhoneCall size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Wing Kit's Call Script Helper</h1>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Peplow-Warren Training</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all ${isTimerRunning ? 'bg-red-50 border-red-100 text-red-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
              <Clock size={16} className={isTimerRunning ? 'animate-pulse' : ''} />
              <span className="font-mono font-bold text-sm">{formatTime(seconds)}</span>
              <button 
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`p-1 rounded-full transition-all ${isTimerRunning ? 'hover:bg-red-100' : 'hover:bg-gray-200'}`}
              >
                {isTimerRunning ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
              </button>
            </div>
            
            <button 
              onClick={() => {
                handleReset();
                setSeconds(0);
                setIsTimerRunning(false);
                setNotes('');
              }}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="Reset Call"
            >
              <RefreshCcw size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Personalization Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <User size={16} />
            <h2 className="text-xs font-bold uppercase tracking-widest">Personalization</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                Customer Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                Company Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Script Selection Tabs */}
        <div className="flex p-1 bg-gray-200/50 rounded-2xl">
          {Object.values(SCRIPTS).map((script) => (
            <button
              key={script.id}
              onClick={() => setActiveScriptId(script.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeScriptId === script.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {script.id === 'script1' ? <Phone size={16} /> : <PhoneCall size={16} />}
              {script.title}
            </button>
          ))}
        </div>

        {/* Active Script Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Script Display */}
          <div className="lg:col-span-2 space-y-6">
            <div
              ref={scriptRef}
              key={`${activeScriptId}-${currentNodeId}`}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 opacity-50" />
              
              <div className="relative">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                  {currentNode.label}
                </span>
                
                <div className="prose prose-blue max-w-none">
                  <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap font-medium">
                    {getPersonalizedText(currentNode.text)}
                  </p>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                  {(!customerName || !companyName) && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                      <Info size={14} />
                      Spam Risk: Fill in personalization to avoid detection
                    </div>
                  )}
                  <button
                    onClick={copyToClipboard}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${
                      copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200'
                    }`}
                  >
                    {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                    {copied ? 'Copied!' : 'Copy Script'}
                  </button>
                </div>
              </div>
            </div>

            {/* Options / Next Steps */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">
                {currentNode.isTerminal ? 'End of Branch' : 'Customer Response / Next Step'}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {currentNode.options?.map((option) => (
                  <button
                    key={option.nextNodeId}
                    onClick={() => handleOptionClick(option.nextNodeId)}
                    className="group flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
                  >
                    <span className="font-semibold text-gray-700 group-hover:text-blue-700">
                      {option.label}
                    </span>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
                {currentNode.isTerminal && (
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 p-5 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 transition-all font-bold"
                  >
                    <RefreshCcw size={18} />
                    Start Over
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Context */}
          <div className="space-y-6">
            {/* Training Details Quick Reference */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-blue-600">
                <Info size={16} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest">Training Quick Info</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Location & Date</p>
                  <p className="text-sm font-bold text-gray-800">Concorde Hotel, Shah Alam</p>
                  <p className="text-xs text-gray-500">28 & 29 April 2026 (Tue-Wed)</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Pricing</p>
                  <p className="text-sm font-bold text-gray-800">RM1,280 nett/pax</p>
                  <p className="text-[10px] text-gray-500 italic">+ 8% SST & 4% HRDCorp levy</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-green-50 rounded-xl border border-green-100">
                    <p className="text-[9px] text-green-600 font-bold uppercase">Early Bird</p>
                    <p className="text-xs font-bold text-green-800">10% OFF</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-[9px] text-blue-600 font-bold uppercase">Group (3+)</p>
                    <p className="text-xs font-bold text-blue-800">15% OFF</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-50">
                  <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider mb-1">Bonus Session</p>
                  <p className="text-xs font-medium text-amber-800 leading-tight">ISO 9001:2026 & 14001:2026 Transition Update</p>
                </div>
              </div>
            </div>

            {/* About Peplow-Warren */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-gray-400">
                <Building2 size={16} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest">About Peplow-Warren</h3>
              </div>
              <div className="space-y-3">
                <p className="text-xs text-gray-600 leading-relaxed">
                  We are a specialist <span className="font-bold text-gray-800">ISO Consultancy & Technical Training</span> provider in Malaysia.
                </p>
                <div className="space-y-2">
                  <div className="flex gap-2 items-start">
                    <div className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <p className="text-[11px] text-gray-500"><span className="font-semibold text-gray-700">Expertise:</span> Our consultants sit on ISO & MOSTI technical committees.</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <p className="text-[11px] text-gray-500"><span className="font-semibold text-gray-700">Focus:</span> Practical Internal Audit skills for QMS, EMS, and OHSMS.</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <p className="text-[11px] text-gray-500"><span className="font-semibold text-gray-700">Value:</span> 100% HRDF claimable sessions with real-world audit findings.</p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 italic pt-1 border-t border-gray-50">
                  "We help teams stay compliant and ready for the next ISO transition."
                </p>
              </div>
            </div>

            {/* Call Notes */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-gray-400">
                <StickyNote size={16} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest">Call Notes</h3>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type call notes here..."
                className="w-full h-32 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="bg-blue-900 text-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-blue-300">
                <CheckCircle2 size={16} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest">Primary Goals</h3>
              </div>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">01</span>
                  <span className="text-blue-50">Get the <span className="text-white font-bold underline decoration-blue-400 underline-offset-4">Email Address</span> (Most Important)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">02</span>
                  <span className="text-blue-50">Confirm interest in Combined QEHS Training</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">03</span>
                  <span className="text-blue-50">Identify the right decision maker (HR/L&D)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-gray-400">
                <Info size={16} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest">Tone Reminder</h3>
              </div>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex gap-3">
                  <span className="text-blue-400">•</span>
                  Start light, don’t rush into selling
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">•</span>
                  Ask relevance (very important)
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">•</span>
                  Make it about their team, not your product
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">•</span>
                  Goal: interest → email → follow up
                </li>
              </ul>
            </div>

            {/* WhatsApp Safety Guide */}
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-amber-600">
                <CheckCircle2 size={16} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest">WhatsApp Safety Guide</h3>
              </div>
              <div className="space-y-4">
                <p className="text-[11px] text-amber-800 font-bold leading-tight uppercase tracking-wider">
                  Avoid Spam Reports & Detection
                </p>
                <ul className="space-y-3 text-xs text-amber-900/80 font-medium">
                  <li className="flex gap-2">
                    <span className="text-amber-500 font-bold">01</span>
                    <span>Always use the <b>Personalization</b> fields. Identical messages trigger WhatsApp's spam filters.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500 font-bold">02</span>
                    <span>Ask for permission before sending links or PDF brochures.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500 font-bold">03</span>
                    <span>Space out your messages. Don't send more than 10-15 new outreaches per hour.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500 font-bold">04</span>
                    <span>If they don't reply, don't double-text. This is the #1 reason for "Report Spam" clicks.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500 font-bold">05</span>
                    <span>Ensure your WhatsApp Business profile is complete with a logo and website.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* History / Path */}
            {history.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Current Path</h3>
                <div className="space-y-4">
                  {history.map((node, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-200 flex-shrink-0" />
                      <span className="text-xs text-gray-500 font-medium">{node.label}</span>
                    </div>
                  ))}
                  <div className="flex gap-3 items-start">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 animate-pulse" />
                    <span className="text-xs text-blue-600 font-bold">{currentNode.label}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 text-center">
        <p className="text-xs text-gray-400 font-medium">
          &copy; 2026 Peplow-Warren Internal Audit Call Helper
        </p>
      </footer>
    </div>
  );
}
