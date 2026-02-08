import { MentalHealthReport } from '@/types/chat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmotionBadge } from './EmotionBadge';
import { RiskIndicator } from './RiskIndicator';
import { 
  FileText, 
  Brain, 
  Shield, 
  Lightbulb, 
  Download,
  X,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportPanelProps {
  report: MentalHealthReport | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportPanel({ report, isOpen, onClose }: ReportPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-background border-l border-border shadow-soft-lg z-50 animate-slide-in">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Mental Health Report</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {!report ? (
              <div className="text-center py-12">
                <Brain className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Share a few messages to generate your wellness report
                </p>
              </div>
            ) : (
              <>
                {/* Disclaimer */}
                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    This report is for informational purposes only and is not a medical diagnosis.
                  </p>
                </div>

                {/* Emotions Section */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      Detected Emotions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Primary:</span>
                      <EmotionBadge emotion={report.emotions.primary} />
                    </div>
                    {report.emotions.secondary && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Secondary:</span>
                        <EmotionBadge emotion={report.emotions.secondary} />
                      </div>
                    )}
                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Confidence</span>
                        <span className="font-medium">{Math.round(report.emotions.confidence * 100)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${report.emotions.confidence * 100}%` }}
                        />
                      </div>
                    </div>
                    {report.emotions.indicators.length > 0 && (
                      <div className="pt-2">
                        <span className="text-sm text-muted-foreground">Key indicators:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {report.emotions.indicators.map((indicator, i) => (
                            <span 
                              key={i}
                              className="text-xs px-2 py-1 bg-muted rounded-full"
                            >
                              {indicator}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Risk Assessment */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RiskIndicator 
                      level={report.risk.level} 
                      score={report.risk.score}
                      showDetails
                    />
                    {report.risk.factors.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <span className="text-sm font-medium">Factors:</span>
                        <ul className="mt-1.5 space-y-1">
                          {report.risk.factors.map((factor, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Possible Conditions */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      Observations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {report.possibleConditions.map((condition, i) => (
                        <li 
                          key={i}
                          className="text-sm flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
                        >
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {report.recommendations.map((rec, i) => (
                        <li 
                          key={i}
                          className="text-sm flex items-start gap-2"
                        >
                          <span className="text-primary mt-0.5">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Crisis Resources */}
                {report.risk.level !== 'low' && (
                  <Card className="border-risk-medium/30 bg-risk-medium/5">
                    <CardContent className="pt-4">
                      <h4 className="font-medium text-sm mb-2">Crisis Helplines (India)</h4>
                      <ul className="space-y-1 text-sm">
                        {report.risk.suggestions.map((suggestion, i) => (
                          <li key={i} className="text-muted-foreground">
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Download Button */}
                <Button variant="outline" className="w-full" onClick={() => {
                  const jsonReport = JSON.stringify(report, null, 2);
                  const blob = new Blob([jsonReport], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `mental-health-report-${new Date().toISOString().split('T')[0]}.json`;
                  a.click();
                }}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Report (JSON)
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Generated on {report.timestamp.toLocaleString()}
                </p>
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
