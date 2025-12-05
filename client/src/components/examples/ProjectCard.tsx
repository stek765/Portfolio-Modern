import ProjectCard from '../ProjectCard';

const sampleProject = {
  id: 'firmbox',
  title: 'FirmBox-Gateway',
  description: 'IoT gateway bridging STM32 sensors with MQTT and a secure Flask dashboard for real-time monitoring.',
  image: 'https://github.com/user-attachments/assets/88ab8731-dce1-4559-97c1-71feca898e13',
  technologies: ['C', 'Python', 'Flask', 'MQTT'],
  featured: true,
  githubUrl: 'https://github.com/stek765',
};

export default function ProjectCardExample() {
  return (
    <div className="max-w-md">
      <ProjectCard project={sampleProject} index={0} />
    </div>
  );
}
