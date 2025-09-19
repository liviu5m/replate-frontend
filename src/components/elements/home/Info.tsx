import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Info = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "How do I sign up as a food donor?",
      response:
        "You can register as a food donor by clicking the 'Donate Food' button and filling out our simple registration form. Once approved, you'll be able to schedule food pickups through our platform.",
    },
    {
      id: 2,
      question: "What types of food can be donated?",
      response:
        "We accept most types of unused, unexpired food including prepared meals, fresh produce, baked goods, and packaged items. All donations must meet safety standards and be properly stored before pickup.",
    },
    {
      id: 3,
      question: "How do volunteer drivers work?",
      response:
        "Volunteer drivers use our mobile app to view available pickup routes. They can select routes based on their location and availability, then follow the app's guidance to collect donations and deliver them to recipient organizations.",
    },
    {
      id: 4,
      question:
        "Can I volunteer occasionally, or do I need a regular schedule?",
      response:
        "We welcome both regular and occasional volunteers! You can set your own availability in the app and choose routes that fit your schedule. There's no minimum time commitment required.",
    },
    {
      id: 5,
      question: "How do you ensure food safety?",
      response:
        "All food donors must follow our food safety guidelines, and our drivers are trained to verify food quality upon pickup. We also work with recipient organizations to ensure proper handling and storage of donations.",
    },
    {
      id: 6,
      question: "Is my donation tax-deductible?",
      response:
        "Yes! Replate is a registered 501(c)(3) nonprofit organization. After each donation, you'll receive a tax receipt that you can use for your records.",
    },
  ]);
  const [openedQuestionId, setOpenedQuestionId] = useState(0);

  return (
    <div className="flex items-center justify-center py-20 w-full">
      <div className="container flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold text-center mb-3">
          What Our Partners Say
        </h1>
        <h3 className="text-xl text-center text-gray-600">
          Hear from the people who make our mission possible
        </h3>
        <div className="w-1/2 mt-10">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="w-full p-10 flex items-center justify-between gap-20">
                  <div>
                    <FontAwesomeIcon icon={faUser} className="text-6xl" />
                  </div>
                  <div>
                    <p className="text-gray-700">
                      "Working with Replate has reduced our food waste by 85%
                      while helping us give back to our community. The process
                      is seamless and their team is incredibly responsive."
                    </p>
                    <h5 className="font-semibold mt-3">Sarah Johnson</h5>
                    <h5 className="text-[#22C55E]">Restaurant Owner</h5>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="w-full p-10 flex items-center justify-between gap-20">
                  <div>
                    <FontAwesomeIcon icon={faUser} className="text-6xl" />
                  </div>
                  <div>
                    <p className="text-gray-700">
                      "As a food bank, we've been able to serve 40% more people
                      thanks to the consistent donations we receive through
                      Replate. Their platform has truly revolutionized food
                      rescue."
                    </p>
                    <h5 className="font-semibold mt-3">Michael Chen</h5>
                    <h5 className="text-[#22C55E]">NGO Director</h5>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="w-full p-10 flex items-center justify-between gap-20">
                  <div>
                    <FontAwesomeIcon icon={faUser} className="text-6xl" />
                  </div>
                  <div>
                    <p className="text-gray-700">
                      "Volunteering as a driver for Replate has been incredibly
                      rewarding. The app makes it easy to find pickup routes
                      that fit my schedule, and knowing I'm helping reduce food
                      waste while feeding people is amazing."
                    </p>
                    <h5 className="font-semibold mt-3">Priya Patel</h5>
                    <h5 className="text-[#22C55E]">Volunteer Driver</h5>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="mt-20">
          <h1 className="text-3xl font-bold text-center mb-3">
            Frequently Asked Questions
          </h1>
          <h3 className="text-xl text-center text-gray-600 mt-3">
            Find answers to common questions about our food donation process
          </h3>
          <div className="mt-5 w-[1000px]">
            {questions.map((question, i) => {
              return (
                <div className=" py-5 border-b border-gray-600 mb-2">
                  <div
                    key={i}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() =>
                      setOpenedQuestionId(
                        question.id == openedQuestionId ? 0 : question.id
                      )
                    }
                  >
                    <h1>{question.question}</h1>
                    <FontAwesomeIcon
                      icon={
                        openedQuestionId == question.id
                          ? faArrowUp
                          : faArrowDown
                      }
                      className={`text-2xl ${
                        openedQuestionId == question.id
                          ? "text-[#22C55E]"
                          : "text-gray-600"
                      }`}
                    />
                  </div>
                  {openedQuestionId == question.id && (
                    <p className="text-gray-600 mt-2">{question.response}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
