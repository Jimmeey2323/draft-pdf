import { MergeSettings as MergeSettingsType } from '@/types/pdf';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MergeSettingsProps {
  settings: MergeSettingsType;
  onChange: (settings: MergeSettingsType) => void;
}

export function MergeSettings({ settings, onChange }: MergeSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-3 block">Merge Type</Label>
        <RadioGroup
          value={settings.mergeType}
          onValueChange={(value) => onChange({ ...settings, mergeType: value as 'vertical' | 'horizontal' })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vertical" id="vertical" />
            <Label htmlFor="vertical" className="font-normal cursor-pointer">
              Vertical (Stack Pages)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="horizontal" id="horizontal" />
            <Label htmlFor="horizontal" className="font-normal cursor-pointer">
              Horizontal (2-up Side-by-Side)
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Orientation</Label>
        <Select
          value={settings.orientation}
          onValueChange={(value) => onChange({ ...settings, orientation: value as 'portrait' | 'landscape' })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portrait">Portrait</SelectItem>
            <SelectItem value="landscape">Landscape</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Quality</Label>
        <Select
          value={settings.quality}
          onValueChange={(value) => onChange({ ...settings, quality: value as 'draft' | 'standard' | 'high' })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="high">High Quality</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
