// --- Contact Section ---

import { useState } from "react";
import { callGeminiAPI } from '../helpers/common'
import Section from "./Section";
import {Sparkles, Mail, MousePointerClick, Send  } from 'lucide-react'
import {SocialLinks} from './SocialLinks'

const InputField = ({ name, placeholder, value, onChange, type = 'text', isTextarea = false }) => {
  const commonProps = {
    name: name,
    id: name,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    required: true,
    className: "w-full p-4 bg-transparent border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-lg text-gray-900 dark:text-white"
  };
  return isTextarea ? (
    <textarea {...commonProps} rows="5" />
  ) : (
    <input {...commonProps} type={type} />  
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for Gemini Pitch Generator
  const [pitchQuery, setPitchQuery] = useState('');
  const [generatedPitch, setGeneratedPitch] = useState('');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [pitchError, setPitchError] = useState('');

  // State for Gemini Message Drafter
  const [draftQuery, setDraftQuery] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftError, setDraftError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setDraftQuery(''); // Clear draft query as well
  };

  // Handler for Personalized Pitch
  const handleGeneratePitch = async () => {
    if (!pitchQuery) {
      setPitchError('Please enter your role or company.');
      return;
    }
    setIsGeneratingPitch(true);
    setGeneratedPitch('');
    setPitchError('');

    const systemPrompt = "You are Shihabe Shangvi, a skilled web developer with expertise in the MERN stack (MongoDB, Express, React, Node.js), Python, C, and Tailwind CSS. A visitor is on your portfolio.";
    const userPrompt = `Based on my role as a '${pitchQuery}', generate a concise (2-3 sentences) and professional pitch explaining why you are a strong candidate for my team or project.`;

    try {
      const pitch = await callGeminiAPI(userPrompt, systemPrompt);
      setGeneratedPitch(pitch);
    } catch (error) {
      setPitchError('Failed to generate pitch. Please try again.');
      console.error(error);
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  // Handler for AI Message Drafter
  const handleDraftMessage = async () => {
    if (!draftQuery) {
      setDraftError('Please enter a purpose for the message.');
      return;
    }
    setIsDrafting(true);
    setDraftError('');

    const systemPrompt = "You are a professional recruiter or client visiting Shihabe Shangvi's portfolio. You want to send him a message.";
    const userPrompt = `Draft a professional message to Shihabe for the purpose of: '${draftQuery}'. Provide a suggested name (like 'A Potential Client') and email (like 'user@example.com') as placeholders, and the full message content.`;

    try {
      const jsonString = await callGeminiAPI(userPrompt, systemPrompt, true);
      const parsedData = JSON.parse(jsonString);
      
      setFormData({
        name: parsedData.suggestedName || '',
        email: parsedData.suggestedEmail || '',
        message: parsedData.draftedMessage || ''
      });

    } catch (error) {
      setDraftError('Failed to draft message. Please try again.');
      console.error(error);
    } finally {
      setIsDrafting(false);
    }
  };



  const aLittleMoreAboutMe = "Hey, I am a web developer, cli tool builder and simple software developer. I have a good command over Python, Javascript and C,also I am comfortable with javascript most popular framework such as react and express. I can build simple softwares with Tkinter and PyQt5."

  const yourClosingClause = "So, if you are interested to hire me for a project or any kind of business work. We can definitely discuss the matter on,..."

  const email = "Shihab38900@gmail.com"

  return (
    <Section id="contact" title="Ping Me!">
      <div className="max-w-3xl mx-auto text-center pt-4">
        {/* Intro Text */}
        <div className="text-lg text-left text-gray-700 dark:text-gray-400 leading-relaxed space-y-6 mb-12">
          <p> {aLittleMoreAboutMe} </p>
          <p> {yourClosingClause} </p>
        </div>

        {/* --- ✨ Gemini Pitch Generator --- */}
        <div className="mb-12 p-6 bg-gray-50 dark:bg-[#171F30] rounded-lg shadow-inner text-left">
          <h6 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Sparkles className="w-12 h-12 lg:w-6 lg:h-6 mr-2 text-purple-600 rounded dark:text-purple-400" />
            <span className="bg-gradient-to-r from-purple-500 font-bold to-yellow-500 bg-clip-text text-transparent">
              Recruiter? Get a Personalized Pitch
            </span>
          </h6>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            Enter your role or company (e.g., "Tech Lead at Startup") to see why I'm a a great fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={pitchQuery}
              onChange={(e) => setPitchQuery(e.target.value)}
              placeholder="Your Role / Company..."
              className="flex-grow p-3 bg-white dark:bg-[#0B1120] border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-lg text-gray-900 dark:text-white"
            />
            <button
              onClick={handleGeneratePitch}
              disabled={isGeneratingPitch || !pitchQuery}
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg transform transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {isGeneratingPitch ? 'Generating...' : 'Generate'}
            </button>
          </div>
          {pitchError && <p className="text-red-500 dark:text-red-400 text-sm mb-4">{pitchError}</p>}
          {generatedPitch && (
            <div className="p-4 bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{generatedPitch}</p>
            </div>
          )}
        </div>
        {/* --- End Gemini Pitch Generator --- */}


        {/* --- social links */}

        <div>
          <SocialLinks/>
        </div>


        {/* Email Button */}
        
        <a
          href={`mailto:${email}`}
          className=" px-4 py-4 text-lg font-medium text-purple-500 "
        >
          <div className="flex justify-center items-center mt-0">
            <span className=" ff rounded text-2xl bg-gradient-to-r from-blue-700 to-blue-500 lg:text-4xl text-white shadow-sm shadow-blue-500 translate-y-0.5 px-2"> 
                  {email} 
            </span>
            <span className="text-blue-800 dark:text-blue-500 pt-16 animate-pulse">
              <MousePointerClick className="h-8 w-8" />
            </span> 
          </div>

          <div className="inline-flex px-4 items-center justify-center space-x-3 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
            <Mail className="w-6 h-6 mb-1" />
            <span className="">Send Email</span>
          </div>

        </a>
        

        <p className="text-lg text-justify text-gray-700 dark:text-gray-400 mb-8 my-16">
          Or, Leave a short message. So, that I can track you later on,...
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-1 text-left">
          
          <p className="text-purple-500">Your Name</p>
          <InputField name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
          <p className="text-purple-500 pt-4">Your Email</p>
          <InputField name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" type="email" />
          <p className="text-purple-500 pt-4">Your Message</p>
          <InputField name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" isTextarea />
          
          {/* --- ✨ Gemini Message Drafter --- */}
          <div className="p-4 bg-gray-50 dark:bg-[#171F30]/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
             <label htmlFor="draftQuery" className="block text-lg bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent dark:text-gray-300">
              Need help drafting your message?
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                id="draftQuery"
                value={draftQuery}
                onChange={(e) => setDraftQuery(e.target.value)}
                placeholder="e.g., 'Job offer for frontend role' or 'Freelance inquiry'"
                className="flex-grow p-3 bg-white dark:bg-[#0B1120] border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-base text-gray-900 dark:text-white"
              />
              <button
                type="button" // Important: type="button" to not submit the form
                onClick={handleDraftMessage}
                disabled={isDrafting || !draftQuery}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-900/80 rounded-lg shadow-sm transform transition-all duration-300 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {isDrafting ? 'Drafting...' : 'Auto-Draft Message'}
              </button>
            </div>
            {draftError && <p className="text-red-500 dark:text-red-400 text-sm">{draftError}</p>}
          </div>
          {/* --- End Gemini Message Drafter --- */}
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center  px-8 py-4 mt-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-800 hover:bg-purple-700 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <Send className="h-5 w-5 me-2"/> Personal Text
            </button>
          </div>
        </form>


      </div>
    </Section>
  );
};

export default Contact;