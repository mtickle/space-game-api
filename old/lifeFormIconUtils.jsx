// components/LifeformIcon.js
import * as Icons from 'lucide-react';

const LifeformIcon = ({ type, className = 'inline w-4 h-4 mr-1 text-green-400' }) => {
    const matched = lifeformTypes.find(l => l.type === type);
    const iconName = matched?.icon || 'QuestionMark';
    const LucideIcon = Icons[iconName] || Icons.QuestionMark;

    return <LucideIcon className={className} />;
};

// Mapping type to icon name
const lifeformIconMap = {
    mammal: 'PawPrint',
    reptile: 'Turtle',
    avian: 'Feather',
    amphibian: 'Droplet',
    insectoid: 'Bug',
    crustacean: 'Droplet',     // Not a real Lucide icon, may fallback to something else
    rodent: 'MousePointer',
    cephalopod: 'Octagon',
    plantimal: 'Leaf',
    hybrid: 'Sparkles',
    synthetic: 'Cpu'
};

export default LifeformIcon;
