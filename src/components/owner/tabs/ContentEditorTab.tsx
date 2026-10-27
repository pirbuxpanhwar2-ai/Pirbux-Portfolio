import React, { useState } from 'react';
import {
  PortfolioState,
  SlidePhoto,
  ExperienceItem,
  CertificateItem,
  RecommendationItem,
  JourneyMilestone,
  ServiceItem,
  EducationItem,
  UploadedFile
} from '../../../types/portfolio';
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  Check,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Briefcase,
  Award,
  MessageSquare,
  GraduationCap,
  Layers,
  Phone,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface ContentEditorTabProps {
  portfolio: PortfolioState;
  onUpdatePortfolio: (updated: Partial<PortfolioState>) => void;
  files: UploadedFile[];
}

type EditorSection =
  | 'hero'
  | 'slides'
  | 'about'
  | 'journey'
  | 'experience'
  | 'certificates'
  | 'recommendations'
  | 'skills'
  | 'services'
  | 'education'
  | 'contact';

export const ContentEditorTab: React.FC<ContentEditorTabProps> = ({
  portfolio,
  onUpdatePortfolio,
  files
}) => {
  const [activeSection, setActiveSection] = useState<EditorSection>('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Local draft states
  const [heroDraft, setHeroDraft] = useState(portfolio.hero);
  const [aboutDraft, setAboutDraft] = useState(portfolio.about);
  const [journeyDraft, setJourneyDraft] = useState(portfolio.journey);
  const [experienceDraft, setExperienceDraft] = useState(portfolio.experience);
  const [certificatesDraft, setCertificatesDraft] = useState(portfolio.certificates);
  const [recommendationsDraft, setRecommendationsDraft] = useState(portfolio.recommendations);
  const [skillsDraft, setSkillsDraft] = useState(portfolio.skills);
  const [servicesDraft, setServicesDraft] = useState(portfolio.services);
  const [educationDraft, setEducationDraft] = useState(portfolio.education);
  const [contactDraft, setContactDraft] = useState(portfolio.contact);

  // New item modal or inline states
  const [newTypewriterWord, setNewTypewriterWord] = useState('');

  const triggerSaveNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const saveHero = () => {
    onUpdatePortfolio({ hero: heroDraft });
    triggerSaveNotification();
  };

  const saveAbout = () => {
    onUpdatePortfolio({ about: aboutDraft });
    triggerSaveNotification();
  };

  const saveJourney = () => {
    onUpdatePortfolio({ journey: journeyDraft });
    triggerSaveNotification();
  };

  const saveExperience = () => {
    onUpdatePortfolio({ experience: experienceDraft });
    triggerSaveNotification();
  };

  const saveCertificates = () => {
    onUpdatePortfolio({ certificates: certificatesDraft });
    triggerSaveNotification();
  };

  const saveRecommendations = () => {
    onUpdatePortfolio({ recommendations: recommendationsDraft });
    triggerSaveNotification();
  };

  const saveSkills = () => {
    onUpdatePortfolio({ skills: skillsDraft });
    triggerSaveNotification();
  };

  const saveServices = () => {
    onUpdatePortfolio({ services: servicesDraft });
    triggerSaveNotification();
  };

  const saveEducation = () => {
    onUpdatePortfolio({ education: educationDraft });
    triggerSaveNotification();
  };

  const saveContact = () => {
    onUpdatePortfolio({ contact: contactDraft });
    triggerSaveNotification();
  };

  return (
    <div className="space-y-6 text-[#f2f7f4]">
      {/* Toast notification */}
      {saveSuccess && (
        <div className="p-3 bg-[#19e05f]/20 border border-[#19e05f] text-[#19e05f] rounded-xl flex items-center justify-between text-xs font-semibold animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Changes successfully saved to live webpage!</span>
          </div>
          <span className="text-[11px] text-gray-300">Live preview updated</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#16271c] text-xs">
        {[
          { id: 'hero', label: 'Hero & Title', icon: Layers },
          { id: 'slides', label: 'Photos / Slides', icon: ImageIcon },
          { id: 'about', label: 'About Me', icon: Edit2 },
          { id: 'journey', label: 'Journey Timeline', icon: FileCheck },
          { id: 'experience', label: 'Work Experience', icon: Briefcase },
          { id: 'certificates', label: 'Certificates & Awards', icon: Award },
          { id: 'recommendations', label: 'Recommendations', icon: MessageSquare },
          { id: 'skills', label: 'Skills & Tools', icon: Layers },
          { id: 'services', label: 'Services & KPIs', icon: Briefcase },
          { id: 'education', label: 'Education', icon: GraduationCap },
          { id: 'contact', label: 'Contact & QR', icon: Phone }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as EditorSection)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#19e05f] text-[#031007] font-bold shadow-md shadow-[#19e05f33]'
                  : 'bg-[#0a180f] text-gray-300 border border-[#16271c] hover:border-[#1d5a35] hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* ---------------- 1. HERO EDITOR ---------------- */}
      {activeSection === 'hero' && (
        <div className="p-5 bg-[#09150d] border border-[#16271c] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#16271c] pb-3">
            <div>
              <h4 className="font-semibold text-white text-base">Hero Section Content</h4>
              <p className="text-xs text-[#9aaaa0]">Edit main greeting, headline, keywords &amp; badges</p>
            </div>
            <button
              onClick={saveHero}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#19e05f] text-[#031007] font-semibold text-xs rounded-xl hover:bg-[#7cf0a3] transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Hero Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                value={heroDraft.name}
                onChange={(e) => setHeroDraft({ ...heroDraft, name: e.target.value })}
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white focus:outline-none focus:border-[#19e05f]"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Professional Title</label>
              <input
                type="text"
                value={heroDraft.profession}
                onChange={(e) => setHeroDraft({ ...heroDraft, profession: e.target.value })}
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white focus:outline-none focus:border-[#19e05f]"
              />
            </div>
          </div>

          {/* Open to Work Badge */}
          <div className="p-3.5 bg-[#050e09] border border-[#1d4029] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-white">
                <input
                  type="checkbox"
                  checked={heroDraft.isOpenToWork}
                  onChange={(e) => setHeroDraft({ ...heroDraft, isOpenToWork: e.target.checked })}
                  className="rounded text-[#19e05f] bg-[#0a180f] border-[#1d5a35]"
                />
                <span>Display &quot;Open to Work&quot; Badge on Hero</span>
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">Badge Title</label>
                <input
                  type="text"
                  value={heroDraft.badgeText}
                  onChange={(e) => setHeroDraft({ ...heroDraft, badgeText: e.target.value })}
                  className="w-full p-2 bg-[#09150d] border border-[#1d4029] rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Badge Target Roles</label>
                <input
                  type="text"
                  value={heroDraft.badgeSub}
                  onChange={(e) => setHeroDraft({ ...heroDraft, badgeSub: e.target.value })}
                  className="w-full p-2 bg-[#09150d] border border-[#1d4029] rounded-lg text-white"
                />
              </div>
            </div>
          </div>

          {/* Greeting & Headline */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-400 mb-1">Top Greeting Banner</label>
              <input
                type="text"
                value={heroDraft.greeting}
                onChange={(e) => setHeroDraft({ ...heroDraft, greeting: e.target.value })}
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-gray-400 mb-1">Title First Line</label>
                <input
                  type="text"
                  value={heroDraft.titlePrefix}
                  onChange={(e) => setHeroDraft({ ...heroDraft, titlePrefix: e.target.value })}
                  className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-400 mb-1">Animated Typewriter Rotating Keywords</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {heroDraft.typedWords.map((word, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#19e05f]/20 border border-[#19e05f]/50 text-[#19e05f] text-xs"
                    >
                      <span>{word}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setHeroDraft({
                            ...heroDraft,
                            typedWords: heroDraft.typedWords.filter((_, i) => i !== idx)
                          })
                        }
                        className="text-gray-400 hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTypewriterWord}
                    onChange={(e) => setNewTypewriterWord(e.target.value)}
                    placeholder="Add new keyword..."
                    className="flex-1 p-2 bg-[#050e09] border border-[#1d4029] rounded-xl text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newTypewriterWord.trim()) {
                        setHeroDraft({
                          ...heroDraft,
                          typedWords: [...heroDraft.typedWords, newTypewriterWord.trim()]
                        });
                        setNewTypewriterWord('');
                      }
                    }}
                    className="px-3 py-1.5 bg-[#143320] hover:bg-[#19e05f] hover:text-[#031007] text-white rounded-xl text-xs font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Hero Subtitle Paragraph</label>
              <textarea
                rows={2}
                value={heroDraft.subtitle}
                onChange={(e) => setHeroDraft({ ...heroDraft, subtitle: e.target.value })}
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white resize-y"
              />
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="block text-gray-400 mb-1">Years in Dining</label>
                <input
                  type="text"
                  value={heroDraft.diningYears}
                  onChange={(e) => setHeroDraft({ ...heroDraft, diningYears: e.target.value })}
                  className="w-full p-2 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Years in Management</label>
                <input
                  type="text"
                  value={heroDraft.mgmtYears}
                  onChange={(e) => setHeroDraft({ ...heroDraft, mgmtYears: e.target.value })}
                  className="w-full p-2 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">City</label>
                <input
                  type="text"
                  value={heroDraft.locationCity}
                  onChange={(e) => setHeroDraft({ ...heroDraft, locationCity: e.target.value })}
                  className="w-full p-2 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Country</label>
                <input
                  type="text"
                  value={heroDraft.locationCountry}
                  onChange={(e) => setHeroDraft({ ...heroDraft, locationCountry: e.target.value })}
                  className="w-full p-2 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 2. SLIDESHOW / PHOTOS EDITOR ---------------- */}
      {activeSection === 'slides' && (
        <div className="p-5 bg-[#09150d] border border-[#16271c] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#16271c] pb-3">
            <div>
              <h4 className="font-semibold text-white text-base">Hero Profile Slideshow Photos</h4>
              <p className="text-xs text-[#9aaaa0]">Add, replace, or reorder the portrait photos in the hero frame</p>
            </div>
            <button
              onClick={saveHero}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#19e05f] text-[#031007] font-semibold text-xs rounded-xl hover:bg-[#7cf0a3]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Photo Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {heroDraft.slides.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className="p-3.5 rounded-xl bg-[#050e09] border border-[#1d4029] flex flex-col gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={slide.url}
                    alt={slide.alt || 'Profile photo'}
                    className="w-20 h-24 object-cover rounded-lg border border-[#19e05f]/40 bg-black shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div>
                      <label className="block text-gray-400 mb-0.5">Caption / Label</label>
                      <input
                        type="text"
                        value={slide.caption || ''}
                        onChange={(e) => {
                          const updated = [...heroDraft.slides];
                          updated[idx].caption = e.target.value;
                          setHeroDraft({ ...heroDraft, slides: updated });
                        }}
                        className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-0.5">Focal Position (e.g. 50% 18%)</label>
                      <input
                        type="text"
                        value={slide.focus || '50% 20%'}
                        onChange={(e) => {
                          const updated = [...heroDraft.slides];
                          updated[idx].focus = e.target.value;
                          setHeroDraft({ ...heroDraft, slides: updated });
                        }}
                        className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#14231a]">
                  <span className="text-[11px] text-gray-400 font-mono">Slide #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (heroDraft.slides.length <= 1) {
                        alert('You must have at least one hero photo.');
                        return;
                      }
                      setHeroDraft({
                        ...heroDraft,
                        slides: heroDraft.slides.filter((_, i) => i !== idx)
                      });
                    }}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Slide</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Slide Option */}
          <div className="p-4 rounded-xl bg-[#050e09] border border-dashed border-[#1d5a35] space-y-3 text-xs">
            <h5 className="font-semibold text-[#19e05f] flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Add New Profile Photo to Slideshow</span>
            </h5>
            <p className="text-gray-400">
              Select an image from your uploaded files or paste a direct image URL:
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              {files
                .filter((f) => f.type === 'image')
                .slice(0, 6)
                .map((file) => (
                  <button
                    key={file.id}
                    type="button"
                    onClick={() => {
                      const newSlide: SlidePhoto = {
                        id: 'slide-' + Date.now(),
                        url: file.dataUrl,
                        alt: file.name,
                        caption: file.name.replace(/\.[^/.]+$/, ''),
                        focus: '50% 20%'
                      };
                      setHeroDraft({
                        ...heroDraft,
                        slides: [...heroDraft.slides, newSlide]
                      });
                    }}
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-[#0b1b11] border border-[#1d4029] hover:border-[#19e05f] transition-all"
                  >
                    <img src={file.dataUrl} alt={file.name} className="w-6 h-6 object-cover rounded" />
                    <span className="text-white text-[11px] truncate max-w-[120px]">{file.name}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 3. ABOUT ME EDITOR ---------------- */}
      {activeSection === 'about' && (
        <div className="p-5 bg-[#09150d] border border-[#16271c] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#16271c] pb-3">
            <div>
              <h4 className="font-semibold text-white text-base">About Me Section</h4>
              <p className="text-xs text-[#9aaaa0]">Edit biography headline and detailed background text</p>
            </div>
            <button
              onClick={saveAbout}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#19e05f] text-[#031007] font-semibold text-xs rounded-xl hover:bg-[#7cf0a3]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save About Changes</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-400 mb-1">About Main Heading</label>
              <textarea
                rows={2}
                value={aboutDraft.heading}
                onChange={(e) => setAboutDraft({ ...aboutDraft, heading: e.target.value })}
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Biography Paragraph</label>
              <textarea
                rows={4}
                value={aboutDraft.paragraphs[0] || ''}
                onChange={(e) => setAboutDraft({ ...aboutDraft, paragraphs: [e.target.value] })}
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Call to Action Button Text</label>
              <input
                type="text"
                value={aboutDraft.ctaText}
                onChange={(e) => setAboutDraft({ ...aboutDraft, ctaText: e.target.value })}
                className="w-full sm:w-1/2 p-2 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 4. JOURNEY TIMELINE EDITOR ---------------- */}
      {activeSection === 'journey' && (
        <div className="p-5 bg-[#09150d] border border-[#16271c] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#16271c] pb-3">
            <div>
              <h4 className="font-semibold text-white text-base">My Journey Milestones</h4>
              <p className="text-xs text-[#9aaaa0]">Add, update or remove career milestones from your roadmap</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newMilestone: JourneyMilestone = {
                    id: 'j-' + Date.now(),
                    time: 'Year',
                    role: 'New Position',
                    company: 'Company / Outlet',
                    isCurrent: false
                  };
                  setJourneyDraft([...journeyDraft, newMilestone]);
                }}
                className="flex items-center gap-1 px-3 py-2 bg-[#0b1b11] border border-[#1d5a35] text-[#19e05f] font-semibold text-xs rounded-xl hover:bg-[#12311f]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Milestone</span>
              </button>
              <button
                onClick={saveJourney}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#19e05f] text-[#031007] font-semibold text-xs rounded-xl hover:bg-[#7cf0a3]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Milestones</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {journeyDraft.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-3.5 rounded-xl bg-[#050e09] border border-[#16271c] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs"
              >
                <div className="sm:col-span-3">
                  <label className="block text-gray-500 text-[10px] uppercase">Timeframe</label>
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => {
                      const updated = [...journeyDraft];
                      updated[idx].time = e.target.value;
                      setJourneyDraft(updated);
                    }}
                    className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-gray-500 text-[10px] uppercase">Job Title</label>
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) => {
                      const updated = [...journeyDraft];
                      updated[idx].role = e.target.value;
                      setJourneyDraft(updated);
                    }}
                    className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white font-medium"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-gray-500 text-[10px] uppercase">Company &amp; Location</label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => {
                      const updated = [...journeyDraft];
                      updated[idx].company = e.target.value;
                      setJourneyDraft(updated);
                    }}
                    className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center justify-between gap-2">
                  <label className="flex items-center gap-1 cursor-pointer text-[11px] text-gray-300">
                    <input
                      type="checkbox"
                      checked={item.isCurrent}
                      onChange={(e) => {
                        const updated = [...journeyDraft];
                        updated[idx].isCurrent = e.target.checked;
                        setJourneyDraft(updated);
                      }}
                      className="rounded text-[#19e05f] bg-[#0a180f] border-[#1d5a35]"
                    />
                    <span>Current</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setJourneyDraft(journeyDraft.filter((_, i) => i !== idx))}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="Delete milestone"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- 5. WORK EXPERIENCE EDITOR ---------------- */}
      {activeSection === 'experience' && (
        <div className="p-5 bg-[#09150d] border border-[#16271c] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#16271c] pb-3">
            <div>
              <h4 className="font-semibold text-white text-base">Work Experience Cards</h4>
              <p className="text-xs text-[#9aaaa0]">Full restaurant management history with key achievements</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newNum = String(experienceDraft.length + 1).padStart(2, '0');
                  const newXp: ExperienceItem = {
                    id: 'xp-' + Date.now(),
                    number: newNum,
                    role: 'Restaurant Manager',
                    period: '2026 to present',
                    company: 'Restaurant Name, Karachi',
                    details: 'Details of team leadership, food safety standards, and guest service metrics.'
                  };
                  setExperienceDraft([...experienceDraft, newXp]);
                }}
                className="flex items-center gap-1 px-3 py-2 bg-[#0b1b11] border border-[#1d5a35] text-[#19e05f] font-semibold text-xs rounded-xl hover:bg-[#12311f]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Position</span>
              </button>
              <button
                onClick={saveExperience}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#19e05f] text-[#031007] font-semibold text-xs rounded-xl hover:bg-[#7cf0a3]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Experience</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {experienceDraft.map((xp, idx) => (
              <div
                key={xp.id || idx}
                className="p-4 rounded-xl bg-[#050e09] border border-[#1d4029] space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-[#19e05f]">{xp.number || `0${idx + 1}`}</span>
                    <input
                      type="text"
                      value={xp.role}
                      onChange={(e) => {
                        const updated = [...experienceDraft];
                        updated[idx].role = e.target.value;
                        setExperienceDraft(updated);
                      }}
                      className="p-1 bg-[#09150d] border border-[#16271c] rounded text-white font-semibold text-sm"
                      placeholder="Role Title"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setExperienceDraft(experienceDraft.filter((_, i) => i !== idx))}
                    className="text-red-400 hover:text-red-300 p-1 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-500 mb-0.5">Period &amp; Type</label>
                    <input
                      type="text"
                      value={xp.period}
                      onChange={(e) => {
                        const updated = [...experienceDraft];
                        updated[idx].period = e.target.value;
                        setExperienceDraft(updated);
                      }}
                      className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 mb-0.5">Company &amp; Location</label>
                    <input
                      type="text"
                      value={xp.company}
                      onChange={(e) => {
                        const updated = [...experienceDraft];
                        updated[idx].company = e.target.value;
                        setExperienceDraft(updated);
                      }}
                      className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 mb-0.5">Role Responsibilities &amp; Outcomes</label>
                  <textarea
                    rows={3}
                    value={xp.details}
                    onChange={(e) => {
                      const updated = [...experienceDraft];
                      updated[idx].details = e.target.value;
                      setExperienceDraft(updated);
                    }}
                    className="w-full p-2 bg-[#09150d] border border-[#16271c] rounded text-white resize-y"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- 6. CERTIFICATES & AWARDS EDITOR ---------------- */}
      {activeSection === 'certificates' && (
        <div className="p-5 bg-[#09150d] border border-[#16271c] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#16271c] pb-3">
            <div>
              <h4 className="font-semibold text-white text-base">Certificates &amp; Awards</h4>
              <p className="text-xs text-[#9aaaa0]">Manage workplace awards and certified hospitality courses</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newCert: CertificateItem = {
                    id: 'cert-' + Date.now(),
                    tag: 'Course',
                    title: 'New Hospitality Certification',
                    issuer: 'Institution Name',
                    description: 'Completed certification program with honors.',
                    imageUrl: files.find((f) => f.type === 'image')?.dataUrl || ''
                  };
                  setCertificatesDraft([...certificatesDraft, newCert]);
                }}
                className="flex items-center gap-1 px-3 py-2 bg-[#0b1b11] border border-[#1d5a35] text-[#19e05f] font-semibold text-xs rounded-xl hover:bg-[#12311f]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certificate</span>
              </button>
              <button
                onClick={saveCertificates}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#19e05f] text-[#031007] font-semibold text-xs rounded-xl hover:bg-[#7cf0a3]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Certificates</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificatesDraft.map((cert, idx) => (
              <div
                key={cert.id || idx}
                className="p-4 rounded-xl bg-[#050e09] border border-[#1d4029] space-y-3 text-xs"
              >
                <div className="flex gap-3">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-24 h-18 object-cover rounded-lg border border-[#19e05f]/40 bg-black shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <div className="w-24">
                        <label className="block text-gray-500 text-[10px]">Tag (Award/Course)</label>
                        <input
                          type="text"
                          value={cert.tag}
                          onChange={(e) => {
                            const updated = [...certificatesDraft];
                            updated[idx].tag = e.target.value;
                            setCertificatesDraft(updated);
                          }}
                          className="w-full p-1 bg-[#09150d] border border-[#16271c] rounded text-[#19e05f] font-semibold"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-gray-500 text-[10px]">Certificate Title</label>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => {
                            const updated = [...certificatesDraft];
                            updated[idx].title = e.target.value;
                            setCertificatesDraft(updated);
                          }}
                          className="w-full p-1 bg-[#09150d] border border-[#16271c] rounded text-white font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[10px]">Issuing Body / Organization</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => {
                          const updated = [...certificatesDraft];
                          updated[idx].issuer = e.target.value;
                          setCertificatesDraft(updated);
                        }}
                        className="w-full p-1 bg-[#09150d] border border-[#16271c] rounded text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 text-[10px]">Description / Recognition details</label>
                  <input
                    type="text"
                    value={cert.description}
                    onChange={(e) => {
                      const updated = [...certificatesDraft];
                      updated[idx].description = e.target.value;
                      setCertificatesDraft(updated);
                    }}
                    className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#14231a]">
                  {/* Select image from uploaded files */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">Attach file:</span>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          const updated = [...certificatesDraft];
                          updated[idx].imageUrl = e.target.value;
                          setCertificatesDraft(updated);
                        }
                      }}
                      className="bg-[#09150d] border border-[#16271c] rounded px-2 py-1 text-[11px] text-white"
                    >
                      <option value="">Choose uploaded image...</option>
                      {files
                        .filter((f) => f.type === 'image')
                        .map((f) => (
                          <option key={f.id} value={f.dataUrl}>
                            {f.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCertificatesDraft(certificatesDraft.filter((_, i) => i !== idx))}
                    className="text-red-400 hover:text-red-300 p-1 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- 7. RECOMMENDATIONS EDITOR ---------------- */}
      {activeSection === 'recommendations' && (
        <div className="p-5 bg-[#09150d] border border-[#16271c] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#16271c] pb-3">
            <div>
              <h4 className="font-semibold text-white text-base">Colleague Recommendations</h4>
              <p className="text-xs text-[#9aaaa0]">Approve, edit or add testimonials from LinkedIn</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newRec: RecommendationItem = {
                    id: 'rec-' + Date.now(),
                    name: 'Colleague Name',
                    role: 'Manager / Peer, Company',
                    context: 'Senior colleague · 2026',
                    quote: 'Pir Bux is a hardworking professional with excellent hospitality standards.',
                    avatarInitials: 'CN',
                    isApproved: true,
                    createdAt: new Date().toISOString().split('T')[0]
                  };
                  setRecommendationsDraft([...recommendationsDraft, newRec]);
                }}
                className="flex items-center gap-1 px-3 py-2 bg-[#0b1b11] border border-[#1d5a35] text-[#19e05f] font-semibold text-xs rounded-xl hover:bg-[#12311f]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Recommendation</span>
              </button>
              <button
                onClick={saveRecommendations}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#19e05f] text-[#031007] font-semibold text-xs rounded-xl hover:bg-[#7cf0a3]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Testimonials</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {recommendationsDraft.map((rec, idx) => (
              <div
                key={rec.id || idx}
                className={`p-4 rounded-xl border text-xs space-y-3 transition-colors ${
                  rec.isApproved
                    ? 'bg-[#050e09] border-[#1d4029]'
                    : 'bg-[#181109] border-amber-500/40 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                    <div>
                      <label className="block text-gray-500 text-[10px]">Recommender Name</label>
                      <input
                        type="text"
                        value={rec.name}
                        onChange={(e) => {
                          const updated = [...recommendationsDraft];
                          updated[idx].name = e.target.value;
                          setRecommendationsDraft(updated);
                        }}
                        className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[10px]">Position &amp; Company</label>
                      <input
                        type="text"
                        value={rec.role}
                        onChange={(e) => {
                          const updated = [...recommendationsDraft];
                          updated[idx].role = e.target.value;
                          setRecommendationsDraft(updated);
                        }}
                        className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[10px]">Relationship &amp; Date</label>
                      <input
                        type="text"
                        value={rec.context}
                        onChange={(e) => {
                          const updated = [...recommendationsDraft];
                          updated[idx].context = e.target.value;
                          setRecommendationsDraft(updated);
                        }}
                        className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={rec.isApproved}
                        onChange={(e) => {
                          const updated = [...recommendationsDraft];
                          updated[idx].isApproved = e.target.checked;
                          setRecommendationsDraft(updated);
                        }}
                        className="rounded text-[#19e05f] bg-[#0a180f] border-[#1d5a35]"
                      />
                      <span className={rec.isApproved ? 'text-[#19e05f]' : 'text-amber-400'}>
                        {rec.isApproved ? 'Published' : 'Hidden'}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setRecommendationsDraft(recommendationsDraft.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 text-[10px]">Recommendation Quote</label>
                  <textarea
                    rows={3}
                    value={rec.quote}
                    onChange={(e) => {
                      const updated = [...recommendationsDraft];
                      updated[idx].quote = e.target.value;
                      setRecommendationsDraft(updated);
                    }}
                    className="w-full p-2 bg-[#09150d] border border-[#16271c] rounded text-white resize-y"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- 8. SKILLS EDITOR ---------------- */}
      {activeSection === 'skills' && (
        <div className="p-5 bg-[#09150d] border border-[#16271c] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#16271c] pb-3">
            <div>
              <h4 className="font-semibold text-white text-base">Skills &amp; Competencies</h4>
              <p className="text-xs text-[#9aaaa0]">Manage categorized skill tags with clickable proof links</p>
            </div>
            <button
              onClick={saveSkills}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#19e05f] text-[#031007] font-semibold text-xs rounded-xl hover:bg-[#7cf0a3]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Skills</span>
            </button>
          </div>

          <div className="space-y-4">
            {skillsDraft.map((cat, catIdx) => (
              <div key={cat.id || catIdx} className="p-4 rounded-xl bg-[#050e09] border border-[#1d4029] space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#19e05f]" />
                    <span>{cat.name} Category</span>
                  </h5>
                  <button
                    type="button"
                    onClick={() => {
                      const skillName = prompt('Enter new skill name:');
                      if (skillName && skillName.trim()) {
                        const updated = [...skillsDraft];
                        updated[catIdx].skills.push({
                          id: 's-' + Date.now(),
                          name: skillName.trim()
                        });
                        setSkillsDraft(updated);
                      }
                    }}
                    className="text-xs text-[#19e05f] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Skill Chip</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={skill.id || sIdx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b1a11] border border-[#1d5a35] text-white"
                    >
                      <span>{skill.name}</span>
                      {skill.level && <em className="text-[#19e05f] not-italic text-[11px]">({skill.level})</em>}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...skillsDraft];
                          updated[catIdx].skills = updated[catIdx].skills.filter((_, i) => i !== sIdx);
                          setSkillsDraft(updated);
                        }}
                        className="text-gray-400 hover:text-red-400 text-sm ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- 9. SERVICES EDITOR ---------------- */}
      {activeSection === 'services' && (
        <div className="p-5 bg-[#09150d] border border-[#16271c] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#16271c] pb-3">
            <div>
              <h4 className="font-semibold text-white text-base">Excel, Dashboards &amp; Office Services</h4>
              <p className="text-xs text-[#9aaaa0]">Configure offerings and pre-filled WhatsApp inquiry prompts</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newSvc: ServiceItem = {
                    id: 'svc-' + Date.now(),
                    title: 'New Service Offering',
                    description: 'Description of the professional service.',
                    icon: 'table',
                    whatsappPrompt: 'service inquiry',
                    promptUrdu: 'سروس'
                  };
                  setServicesDraft([...servicesDraft, newSvc]);
                }}
                className="flex items-center gap-1 px-3 py-2 bg-[#0b1b11] border border-[#1d5a35] text-[#19e05f] font-semibold text-xs rounded-xl hover:bg-[#12311f]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
              <button
                onClick={saveServices}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#19e05f] text-[#031007] font-semibold text-xs rounded-xl hover:bg-[#7cf0a3]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Services</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {servicesDraft.map((svc, idx) => (
              <div
                key={svc.id || idx}
                className="p-4 rounded-xl bg-[#050e09] border border-[#1d4029] space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={svc.title}
                    onChange={(e) => {
                      const updated = [...servicesDraft];
                      updated[idx].title = e.target.value;
                      setServicesDraft(updated);
                    }}
                    className="p-1 bg-[#09150d] border border-[#16271c] rounded text-white font-semibold text-sm flex-1 mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => setServicesDraft(servicesDraft.filter((_, i) => i !== idx))}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-gray-500 mb-0.5">Description</label>
                  <textarea
                    rows={2}
                    value={svc.description}
                    onChange={(e) => {
                      const updated = [...servicesDraft];
                      updated[idx].description = e.target.value;
                      setServicesDraft(updated);
                    }}
                    className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-500 text-[10px]">WhatsApp Inquiry Tag</label>
                    <input
                      type="text"
                      value={svc.whatsappPrompt}
                      onChange={(e) => {
                        const updated = [...servicesDraft];
                        updated[idx].whatsappPrompt = e.target.value;
                        setServicesDraft(updated);
                      }}
                      className="w-full p-1 bg-[#09150d] border border-[#16271c] rounded text-[#19e05f]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px]">Urdu Inquiry Tag</label>
                    <input
                      type="text"
                      value={svc.promptUrdu}
                      onChange={(e) => {
                        const updated = [...servicesDraft];
                        updated[idx].promptUrdu = e.target.value;
                        setServicesDraft(updated);
                      }}
                      className="w-full p-1 bg-[#09150d] border border-[#16271c] rounded text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- 10. EDUCATION EDITOR ---------------- */}
      {activeSection === 'education' && (
        <div className="p-5 bg-[#09150d] border border-[#16271c] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#16271c] pb-3">
            <div>
              <h4 className="font-semibold text-white text-base">Academic Qualifications</h4>
              <p className="text-xs text-[#9aaaa0]">Degrees, colleges and certifications</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newEdu: EducationItem = {
                    id: 'edu-' + Date.now(),
                    institution: 'University or College Name',
                    degree: 'Degree Program',
                    status: '2026'
                  };
                  setEducationDraft([...educationDraft, newEdu]);
                }}
                className="flex items-center gap-1 px-3 py-2 bg-[#0b1b11] border border-[#1d5a35] text-[#19e05f] font-semibold text-xs rounded-xl hover:bg-[#12311f]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Education</span>
              </button>
              <button
                onClick={saveEducation}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#19e05f] text-[#031007] font-semibold text-xs rounded-xl hover:bg-[#7cf0a3]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Education</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {educationDraft.map((edu, idx) => (
              <div
                key={edu.id || idx}
                className="p-3.5 rounded-xl bg-[#050e09] border border-[#16271c] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs"
              >
                <div className="sm:col-span-5">
                  <label className="block text-gray-500 text-[10px]">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => {
                      const updated = [...educationDraft];
                      updated[idx].institution = e.target.value;
                      setEducationDraft(updated);
                    }}
                    className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white font-medium"
                  />
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-gray-500 text-[10px]">Degree / Discipline</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const updated = [...educationDraft];
                      updated[idx].degree = e.target.value;
                      setEducationDraft(updated);
                    }}
                    className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-500 text-[10px]">Year / Status</label>
                  <input
                    type="text"
                    value={edu.status}
                    onChange={(e) => {
                      const updated = [...educationDraft];
                      updated[idx].status = e.target.value;
                      setEducationDraft(updated);
                    }}
                    className="w-full p-1.5 bg-[#09150d] border border-[#16271c] rounded text-[#19e05f]"
                  />
                </div>
                <div className="sm:col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => setEducationDraft(educationDraft.filter((_, i) => i !== idx))}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- 11. CONTACT & QR CODE EDITOR ---------------- */}
      {activeSection === 'contact' && (
        <div className="p-5 bg-[#09150d] border border-[#16271c] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#16271c] pb-3">
            <div>
              <h4 className="font-semibold text-white text-base">Contact Information &amp; QR Code</h4>
              <p className="text-xs text-[#9aaaa0]">Manage direct communication channels and scan cards</p>
            </div>
            <button
              onClick={saveContact}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#19e05f] text-[#031007] font-semibold text-xs rounded-xl hover:bg-[#7cf0a3]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Contact Info</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                value={contactDraft.email}
                onChange={(e) => setContactDraft({ ...contactDraft, email: e.target.value })}
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Phone Number (Calling)</label>
              <input
                type="text"
                value={contactDraft.phone}
                onChange={(e) => setContactDraft({ ...contactDraft, phone: e.target.value })}
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">WhatsApp Number (e.g. 923292571307)</label>
              <input
                type="text"
                value={contactDraft.whatsappNumber}
                onChange={(e) => setContactDraft({ ...contactDraft, whatsappNumber: e.target.value })}
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={contactDraft.linkedinUrl}
                onChange={(e) => setContactDraft({ ...contactDraft, linkedinUrl: e.target.value })}
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-400 mb-1">Physical Location / Address</label>
              <input
                type="text"
                value={contactDraft.locationAddress}
                onChange={(e) => setContactDraft({ ...contactDraft, locationAddress: e.target.value })}
                className="w-full p-2.5 bg-[#050e09] border border-[#1d4029] rounded-xl text-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
