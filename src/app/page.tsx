'use client';

import React from 'react';
import { Copy, Scissors, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function ParagraphSplitter() {
  const [paragraph, setParagraph] = React.useState('');
  const [splitSegments, setSplitSegments] = React.useState<string[]>([]);
  const [isSplitting, setIsSplitting] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    // Import Tiro Tamil font
    const tamilFontLink = document.createElement('link');
    tamilFontLink.href = 'https://fonts.googleapis.com/css2?family=Tiro+Tamil&display=swap';
    tamilFontLink.rel = 'stylesheet';
    document.head.appendChild(tamilFontLink);

    // Import Lexend font for the button
    const lexendFontLink = document.createElement('link');
    lexendFontLink.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap';
    lexendFontLink.rel = 'stylesheet';
    document.head.appendChild(lexendFontLink);

    // Import Inter font for modern UI
    const interFontLink = document.createElement('link');
    interFontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    interFontLink.rel = 'stylesheet';
    document.head.appendChild(interFontLink);

    return () => {
      document.head.removeChild(tamilFontLink);
      document.head.removeChild(lexendFontLink);
      document.head.removeChild(interFontLink);
    };
  }, []);

  const handleSplit = async () => {
    if (!paragraph.trim()) {
      toast({
        title: "No text to split",
        description: "Please enter some text to split",
        variant: "destructive",
      });
      return;
    }

    setIsSplitting(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const bibleBooks = [
      'ஆதியாகமம்', 'ஆதி.',
      'யாத்திராகமம்', 'யாத்.',
      'லேவியராகமம்', 'லேவி.',
      'எண்ணாகமம்', 'எண்.',
      'உபாகமம்', 'உபா.',
      'யோசுவா', 'யோசு.',
      'நியாயாதிபதிகள்', 'நியா.',
      'ரூத்', 'ரூத்.',
      '1 சாமுவேல்', '1 சாமு.',
      '2 சாமுவேல்', '2 சாமு.',
      '1 இராஜாக்கள்', '1 இரா.',
      '2 இராஜாக்கள்', '2 இரா.',
      '1 நாளாகமம்', '1 நாளா.',
      '2 நாளாகமம்', '2 நாளா.',
      'எஸ்றா', 'எஸ்றா.',
      'நெகேமியா', 'நெகே.',
      'எஸ்தர்', 'எஸ்தர்.',
      'யோபு', 'யோபு.',
      'சங்கீதம்', 'சங்.',
      'நீதிமொழிகள்', 'நீதி.',
      'பிரசங்கி', 'பிரச.',
      'உன்னதப்பாட்டு', 'உன்ன.',
      'ஏசாயா', 'ஏசா.',
      'எரேமியா', 'எரே.',
      'புலம்பல்', 'புலம்.',
      'எசேக்கியேல்', 'எசே.',
      'தானியேல்', 'தானி.',
      'ஓசியா', 'ஓசி.',
      'யோவேல்', 'யோவே.',
      'ஆமோஸ்', 'ஆமோ.',
      'ஒபதியா', 'ஒப.',
      'யோனா', 'யோனா.',
      'மீகா', 'மீகா.',
      'நாகூம்', 'நாகூ.',
      'ஆபகூக்', 'ஆப.',
      'செப்பனியா', 'செப்.',
      'ஆகாய்', 'ஆகா.',
      'சகரியா', 'சக.',
      'மல்கியா', 'மல்.',
      'மத்தேயு', 'மத்.',
      'மாற்கு', 'மாற்.',
      'லூக்கா', 'லூக்.',
      'யோவான்', 'யோவா.',
      'அப்போஸ்தலர்', 'அப்.',
      'ரோமர்', 'ரோம.',
      '1 கொரிந்தியர்', '1 கொரி.',
      '2 கொரிந்தியர்', '2 கொரி.',
      'கலாத்தியர்', 'கலா.',
      'எபேசியர்', 'எபேசி.',
      'பிலிப்பியர்', 'பிலி.',
      'கொலோசெயர்', 'கொலோ.',
      '1 தெசலோனிக்கேயர்', '1 தெச.',
      '2 தெசலோனிக்கேயர்', '2 தெச.',
      '1 தீமோத்தேயு', '1 தீமோ.',
      '2 தீமோத்தேயு', '2 தீமோ.',
      'தீத்து', 'தீத்.',
      'பிலேமோன்', 'பிலே.',
      'எபிரெயர்', 'எபி.',
      'யாக்கோபு', 'யாக்.',
      '1 பேதுரு', '1 பேது.',
      '2 பேதுரு', '2 பேது.',
      '1 யோவான்', '1 யோவா.',
      '2 யோவான்', '2 யோவா.',
      '3 யோவான்', '3 யோவா.',
      'யூதா', 'யூதா.',
      'வெளிப்படுத்தல்', 'வெளி.'
    ];
    const bookNamesPattern = bibleBooks.join('|');
    const bibleVersePattern = `(?:${bookNamesPattern})\\s+\\d+:\\d+(?:(?:-|,)\\d+)*`;

    const finalSegments: string[] = [];
    const combinedRegex = new RegExp(`(\\(.*?\\)|\\[.*?\]|${bibleVersePattern})`, 'g');
    let lastIndex = 0;
    let currentAccumulatedText = '';
    let match: RegExpExecArray | null;

    while ((match = combinedRegex.exec(paragraph)) !== null) {
      currentAccumulatedText += paragraph.substring(lastIndex, match.index);
      const capturedSegment = match[0];

      const isPageNumber = /^\[[^\]]*\]$/.test(capturedSegment);
      const isEnglishWord = /^\([A-Za-z]+\)$/.test(capturedSegment);

      let contentToCheckForVerse = capturedSegment;
      if (capturedSegment.startsWith('(') && capturedSegment.endsWith(')')) {
        contentToCheckForVerse = capturedSegment.slice(1, -1).trim();
      }
      const verseCorePattern = new RegExp(`^(?:${bookNamesPattern})\\s+\\d+:\\d+`);
      const isVerseReference = verseCorePattern.test(contentToCheckForVerse);

      if (isPageNumber || isEnglishWord || isVerseReference) {
        if (currentAccumulatedText.trim().length > 0) {
          finalSegments.push(currentAccumulatedText.trim());
        }

        if (isVerseReference) {
          let contentToProcess = capturedSegment;
          if (capturedSegment.startsWith('(') && capturedSegment.endsWith(')')) {
            contentToProcess = capturedSegment.slice(1, -1).trim();
          }

          const hasSemicolonOrCommaRange = contentToProcess.includes(';') || /,\s*\d+-\d+/.test(contentToProcess);
          
          if (hasSemicolonOrCommaRange) {
            const semicolonParts = contentToProcess.split(';').map(s => s.trim()).filter(Boolean);
            semicolonParts.forEach(sPart => {
              const commaRegex = /^(.*?)(?:,\s*(\d+-\d+))?$/;
              const commaMatch = sPart.match(commaRegex);
              if (commaMatch) {
                const mainVerseText = commaMatch[1].trim();
                const verseRangeText = commaMatch[2];
                if (mainVerseText) { finalSegments.push(mainVerseText); }
                if (verseRangeText) { finalSegments.push(verseRangeText); }
              } else {
                finalSegments.push(sPart);
              }
            });
          } else {
            finalSegments.push(capturedSegment);
          }
        } else {
          finalSegments.push(capturedSegment);
        }
        currentAccumulatedText = '';
      } else {
        currentAccumulatedText += capturedSegment;
      }
      lastIndex = combinedRegex.lastIndex;
    }

    currentAccumulatedText += paragraph.substring(lastIndex);
    if (currentAccumulatedText.trim().length > 0) {
      finalSegments.push(currentAccumulatedText.trim());
    }

    setSplitSegments(finalSegments);
    setIsSplitting(false);
    
    toast({
      title: "Split complete!",
      description: `Split into ${finalSegments.length} segments`,
    });
  };

  const copyToClipboard = (text: string) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const copyAllToClipboard = () => {
    try {
      const allText = splitSegments.join('\n\n');
      const textarea = document.createElement('textarea');
      textarea.value = allText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      toast({
        title: "All copied!",
        description: "All segments copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy all text",
        variant: "destructive",
      });
    }
  };

  const clearAll = () => {
    setParagraph('');
    setSplitSegments([]);
    toast({
      title: "Cleared",
      description: "All content has been cleared",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 font-sans flex flex-col items-center" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Header */}
      <div className="w-full max-w-4xl mb-8 text-center pt-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Paragraph Splitter
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Advanced Tamil text processing tool that intelligently splits Bible verses, page numbers, and English words
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-4xl mb-8">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-800">Input Text</CardTitle>
            </div>
            <CardDescription className="text-gray-600 text-base">
              Enter your Tamil paragraph below. The system will automatically detect and split Bible verses, page numbers, and English words.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Textarea
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[180px] text-base transition-all duration-200 hover:border-gray-300"
              placeholder="Paste your Tamil paragraph here..."
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              style={{ fontFamily: '"Tiro Tamil", serif' }}
            />
            
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSplit}
                disabled={isSplitting || !paragraph.trim()}
                style={{ fontFamily: '"Lexend", sans-serif' }}
              >
                {isSplitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Splitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Scissors className="w-5 h-5" />
                    Split Paragraph
                  </div>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
                onClick={clearAll}
                disabled={!paragraph && splitSegments.length === 0}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Output Section */}
      {splitSegments.length > 0 && (
        <div className="w-full max-w-4xl animate-scale-in">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-semibold text-gray-800">Split Results</CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                      {splitSegments.length} segment{splitSegments.length !== 1 ? 's' : ''} extracted
                    </CardDescription>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyAllToClipboard}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
                >
                  <Copy className="w-4 h-4" />
                  Copy All
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {splitSegments.map((segment, index) => (
                  <Card 
                    key={index} 
                    className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 hover:-translate-y-0.5 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {index + 1}
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {segment.startsWith('(') && segment.includes(':') ? 'Verse Reference' :
                             segment.startsWith('[') ? 'Page Number' :
                             segment.startsWith('(') && /^[A-Za-z]+$/.test(segment.slice(1, -1)) ? 'English Word' : 'Text Segment'}
                          </span>
                        </div>
                        <p className="text-gray-800 text-base leading-relaxed break-words" style={{ fontFamily: '"Tiro Tamil", serif' }}>
                          {segment}
                        </p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(segment)}
                        className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg opacity-0 group-hover:opacity-100"
                        aria-label="Copy segment"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>Powered by DevT3</p>
      </div>
    </div>
  );
}
