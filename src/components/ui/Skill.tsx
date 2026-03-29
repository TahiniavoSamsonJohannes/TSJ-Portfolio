type Skill = {
  title: string;
  experience: string;
};

type SkillProps = {
  skills: Skill[];
};

const Skill = ({ skills } : SkillProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-12 bg-secondary py-10">
      {skills.map((skill, index) => (
        <div key={index} className="text-center">
          <h2 className="text-secondary text-3xl font-semibold">
            {skill.title}
          </h2>
          <p className="text-secondary text-sm mt-2 border-b border-secondary inline-block pb-1">
            {skill.experience}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Skill;