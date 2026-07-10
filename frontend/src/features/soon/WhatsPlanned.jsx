import React from 'react'
import ComingSoonCard from './components/ComingSoonCard';

const WhatsPlanned = () => {

  //array of to provide data in the card
  const arrayCard = [
    {
      key: 1,
      featureName: "Advanced Analysis History",
      featureDetail:
        "A comprehensive repository to store, search, and revisit every single deep-dive AI response you generate. Full-text search and timeline filtering included.",
      featureKeyword: ["storage", "search"],
    },
    {
      key: 2,
      featureName: "Project Documentation & API Reference",
      featureDetail:
        "A complete, interactive documentation hub detailing our underlying analytical frameworks and API guides for developers and advanced users.",
      featureKeyword: ["api", "docs"],
    },
    {
      key: 3,
      featureName: "The About Workspace",
      featureDetail:
        "An institutional breakdown of the philosophy behind ThinkTweet and gender-domain evaluation methodology, transparently presented for researchers and users alike.",
      featureKeyword: ["philosophy", "research"],
    },
    {
      key: 4,
      featureName: "Subscription Models",
      featureDetail:
        "Introducing recurring monthly and yearly subscription tiers to unlock high-volume bulk analyses, priority processing, and premium workspace features.",
      featureKeyword: ["monthly", "yearly"],
    },
    {
      key: 5,
      featureName: "Choose Your LLM Model",
      featureDetail:
        "An advanced toggle panel allowing power users to select which underlying Large Language Model drives their tweet breakdown — GPT-4o, Gemini, Llama, and more.",
      featureKeyword: ["llm-select", "power-user"],
    },
  ];
  return (
    <div className="border-t border-t-brand-fourth py-17 px-8 max-phone:px-4">
      <div className="flex max-md:flex-col max-md:gap-2">
        <div>
          <p className="text-brand-tertionary uppercase text-[0.9rem] mb-2 font-mono">
            // Upcoming_features
          </p>
          <h3 className="text-3xl font-semibold max-phone:text-2xl">What's Planned in Phase II</h3>
        </div>
        <p className="ml-auto text-brand-secondary text-base mr-7 self-end max-md:ml-0 max-md:self-start">
          All features are just planned. <br className='lg:hidden max-md:hidden'/> Timelines <br className='max-lg:hidden max-md:block'/> subject to change.
        </p>
      </div>

      {/* Here will be our card */}
      <div className='mt-8 grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-md:grid-cols-1 max-phone:gap-4'>
        {arrayCard.map((elem) =>{
          return <ComingSoonCard key={elem.key} id={elem.key} name={elem.featureName} detail={elem.featureDetail} keyword={elem.featureKeyword}/>
        })}
      </div>
    </div>
  );
}

export default WhatsPlanned