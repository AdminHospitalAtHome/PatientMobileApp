# 6.4.2 Stakeholder Needs and Requirements Definition process
## 1. Prepare for Stakeholder Needs and Requirements Definition
### a. Identify the stakeholders who have an interest in the software system throughout its lifecycle.
### b. Define the stakeholder needs and requirements definition strategy.
### c. Identify and plan for the necessary enabling systems or services needed to support stakeholder needs and requirements definition.
### d. Obtain or acquire acess to the enabling systems or services to be used.

## 2. Define Stakeholder Needs
### a. Define Context of use within the concept of operations and the preliminary life cycle concepts
### b. Identify stakeholder needs.
### c. Prioritize and down-select needs
### d. Define the stakeholder needs and rationale.

## 3. Develope the operational concept and other lifce cycle concepts.
### a. Define a representative set of scenarios to identify the required capabilities that correspond to anticipated operational and other life cycle concepts.
### b. Identify the factors affecting interactions between users and the system

## 4. Transform stakeholder needs into stakeholder requirements.
### a. Identify the ocntraints on a system solution.
### b. Identify the stakeholder requirements and fucntions that relate to critical quality characteristics, such as assurance, safety, security, environment, or health.
### c. Define Stakeholder requirements, comsistent with life cycle concepts, scenarios, interactions, constraints, and critical quality characteristics.

## 5. Analyze stakeholder requirements
### a. Analyze the complete set of stakeholder requirements
### b. Define critical performance measures that enable the assessment of technical achievment.
### c. Feed back the analyzed requirements to applicable stakeholder to validate that their needs and expectations have been adequately captured and expressed.
### d. Resolve stakeholder requirements issues.

## 6. Manage the stakeholder needs and requirments definiton.
### a. Obtain explicit agreement with designated stakeholders on the stakeholder requirements.
### b. Maintain traceability of stakeholder needs and requirements.
### c. Provide key artifacts and information items that have been selected for baselines.



# 6.4.4 Architecture Definition process
## 1. Prepare for architecture definition.

### a. Review pertinent information and identify key drivers of the architecture.
Outcome: c
Implementation: This task is implemented through incremental design. XP makes delivery of software in short iteration, which means the team can learn more about the problem. XP makes “the design of the system an excellent fit for the needs of the system that day”. It is also implemented through test-first programming. For the architecture, this involves testing performance and scalability. 

### b. Identify stakeholder concerns.
Outcome: a
Implementation: This task is implemented through the Stories and Incremental design. With stories we are planning our development with “customer-visible functionality.” This essentially is identifying the functionalities of the application that addresses the stakeholder’s concerns. As we implement stories we design our architecture to make sure the functionality we add adhere to good design in our architecture. We are following incremental design which is “design done close to when it is used is more efficient.” We are designing the system with every progress made to the project. This allows us to meet stakeholder expectations and constraints without incurring any significant cost of resources.

### c. Define the Architecture Definition roadmap, approach, and strategy.
Outcome: b
Implementation: This task is implemented through stories and continuous integration.
Stories are “units of customer-visible functionality” and they can be used to define what needs to be built and therefore create a roadmap, approaches and strategies. Continuous Integration can ensure that architectural changes do not break existing functionality.

### d. Define architecture evaluation criteria based on stakeholder concerns and key requirements.
Outcome: k, g
Implementation: This task is implemented through user stories. Stories are “units of customer-visible functionality”. In XP, the key requirements are turned into stories. These stories provide the initial basis for defining what matters to stakeholders in the architecture.

### e. Identify and plan for the necessary enabling systems or services needed to support the Architecture Definition process.
Outcome: j
Implementation: This task is implemented through continuous integration and incremental design. Continuous integration “integrate and test changes after no more than a couple of hours” allowing us to continuously integrate and test new systems or services added to our project. And through incremental design we can integrate services and systems into our architecture properly, and refine it as we go.

### f. Obtain or acquire access to the enabling systems or services to be used.
Outcome: j
Implementation: This task is implemented through continuous integration (CI). CI is “Integrate and test changes after no more than a couple of hours”. XP ensures this task to be addressed in a continuous manner. Continuous integration gives early feedback which helps solve issues when they are small and less costly to fix.

## 2. Develop architecture viewpoints.
### a. Select, adapt, or develop viewpoints and model kinds based on stakeholder concerns.
Outcome: a,b
Implementation: This task is implemented through user stories. Since stories are “units of customer-visible functionality”, they can capture requirements and concerns of stakeholders. 

### b. Establish or identify potential architecture framework(s) to be used in developing models and views.
Outcome: b,d
Implementation: This test is implemented through incremental design. Through incremental design we “strive to make the design of the system an excellent fit for the needs of the system that day.” and that we design “in light of experience relevant to the system.” That means that when we’re developing our software we are also considering the architectural frameworks we need for the current interface or model and how it can be integrated into our system with proper design.

### c. Capture rationale for selection of framework(s), viewpoints and model kinds.
Outcome: i
Implementation: This task is implemented through stories. According to XP the book, stories are written on “story cards on a wall”. When selecting framework(s), viewpoints, and model kinds, the reasoning might be captured directly on these cards. It can also be implemented through pair programming. Since most rationale are communicated verbally, they can be captured in pair programming sessions.

### d. Select or develop supporting modeling techniques and tools.
Outcome: d
Implementation: There are many kinds of support modeling techniques and tools. For example, project management tools like Jira, continuous integration tools like github actions, version control tools like Git, and test tools like JUnit testing. These are all tools that can support development and can be selected in development.

## 3. Develop models and views of candidate architectures.
### a. Define software system context and boundaries in terms of interfaces and interactions with external entities. 
Outcome: c
Implementation: This task is implemented through user stories. Since user stories are “units of customer-visible functionality”, they can be used to identify interactions. The stories can identify external entities as well.

### b. Identify architectural entities and relationships between entities that address key stakeholder concerns and critical software system requirements. 
Outcome: a
Implementation: This task is implemented through stories and continuous integration. Stories as “units of customer-visible functionality” can help identify the entities and their relationships. Continuous Integration can help address those stakeholder concerns early and quickly.

## c. Allocate concepts, properties, characteristics, behaviors, functions, or constraints that are significant to architecture decisions of the software system to architectural entities. 
Outcome: e
Implementation: The XP book emphasizes test-driven development and test-first programming, which means behaviors and functions can be firstly captured as tests. As long as test passes, these behaviors and functions are allocated. Pair-programming can help allocating them as well.

### d. Select, adapt, or develop models of the candidate architecture of the software system.
Outcome: d
Implementation: This task can be implemented using incremental design. Incremental design “strives to make the design of the system an excellent fit for the needs of the system that day”. It allows developers to constantly improve design to adapt to new requirements. Pair programming is helpful as well since two heads working on the same task can get more optimal results.

### e. Compose views from the models in accordance with identified viewpoints to express how the architecture addresses stakeholder concerns and meets stakeholder and system/software requirements.
Outcome: a,k
Implementation: This can be implemented through continuous feedback. Continuous feedback ensures stakeholder concerns are addressed early, so the project does not go far from requirements. A “short, clear feedback cycle” is important to guarantee all stakeholders’ concerns are addressed.

### f. Harmonize the architecture models and views with each other.
Outcome: d
Implementation: This can be implemented through pair programming. Pair programming can allow different models and views shared upon pair rotations. Pairs can “hold each other accountable to the team’s practices”. This can help resolve discrepancies. Continuous Integration tools can also help harmonize the architecture models and views since they can generate architecture views automatically.

## 4. Relate the architecture to design.
### a. Identify software system elements that relate to architectural entities and the nature of these relationships.
Outcome: f
Implementation: This is implemented through incremental design because incremental design means that “when your understanding of the best possible design leaps forward, work gradually but persistently to bring the design back into alignment with your understanding.” Incremental design requires the developers to understand all parts of the architecture and the relationships between those parts, so as we’re designing the system everyday we’re ensuring it relates to our architecture.

### b. Define the interface and interactions among the software system elements and external entities. 
Outcome: c
Implementation: This is implemented with incremental design. Because we “strive to make the design of the system an excellent fit for the needs of the system that day” when we want to implement a story that integrates an external entity to our application, developers who are implementing the story will ensure that we maintain low coupling between our application and the external entity. If there is coupling between our system and external entity, through iteration and refactoring our design we make sure that we achieve low coupling.

### c. Partition, align, and allocate requirements to architectural entities and system elements.
Outcome: e,k
Implementation:  In XP, requirements are captured through stories, this is partition requirements into chunks that align with the functionalities of the system. Because we’re designing in “small, safe steps” with incremental design, we allocate requirements to different parts of the system overtime by building and designing the architecture piece by piece. With incremental design we are also refactoring as we go. So we are reallocating and realigning our system to be more maintable.

### d. Map software system elements and architectural entities to design characteristics.
Outcome: i
Implementation:

### e. Define principles for the software system design and evolution.
Outcome: h
Implementation: The principles we define for software design and evolution is incremental design, and incremental deployment. As we design our system in small steps we are also refactoring and refining existing designs. We can receive feedback from the client through incremental deployment at every stage of the application. This allows us to incorporate user feedback into the design of the software and improve it to meet the user’s needs.

## 5. Assess architecture candidates.
### a. Assess each candidate architecture against constraints and requirements.
Outcome: g,i
Implementation: In the process of developing the software we do design “close to when it is used”  because it is more efficient. In the light of the experience, the developer will assess which architectural candidates are best for the current system. 

### b. Assess each candidate architecture against stakeholder concerns using evaluation criteria.
Outcome: a,g
Implementation:

### c. Select the preferred architecture(s) and capture key decisions and rationale.
Outcome: g,i
Implementation:

### d. Establish the architecture baseline of the selected architecture.
Outcome: h
Implementation:

## 6. Manage the selected architecture.
### a. Formalize the architecture governance approach and specify governance-related roles and responsibilities, accountabilities, and authorities related to design, quality, security, and safety.
Outcome: c
Implementation: 

### b. Obtain explicit acceptance of the architecture by stakeholders.
Outcome: a
Implementation: This can be ensured by continuous feedback. “A short, clear feedback cycle” can make developers make first-minute changes to current issues and obtain acceptance of stakeholders. It can also be achieved by stories. Accurate stories that match stakeholders’ interest are beneficial to the development. 

### c. Maintain concordance and completeness of the architectural entities and their architectural characteristics.
Outcome: i
Implementation: This can be implemented through test-first programming. Test-first programming allows identifying “explicitly and objectively what the program is supposed to do”. Therefore, it ensures the completeness of architecture and new features do not break current working code. Continuous integration forces frequent testing and can help maintain concordance as well.

### d. Organize, assess, and control evolution of the architecture models and views to help ensure that the architectural intent is met and the architectural vision and key concepts are correctly implemented. 
Outcome: d
Implementation: This can be implemented through continuous integration and pair programming. Continuous integration involves frequent testing, which helps assess the evolution of the architecture models. Pair programming allows up-to-date sharing of architecture and brings different ideas upon pair switching, leading to a more organized model. As the XP book says, pair programming “holds each other accountable to the team’s practices”.

### e. Maintain the architecture definition and evaluation strategy.
Outcome: h
Implementation: This can be implemented using test-driven development and test-first programming. Writing tests first ensures the architecture meets requirements. “If it’s hard to write a test, it’s a signal that you have a design problem”. 

### f. Maintain traceability of architecture.
Outcome: k
Implementation: This can be implemented through stories since they can be a foundation for the architecture. Pair-programming can also help “keep each other on task” by spreading architecture updates in the team.

### g. Provide key artifacts and information items that have been selected for baselines.
Outcome: j
Implementation: Stories are “customer-visible functionality” and can be used as a guide to select key artifacts and information items. Continuous integration ensures program is always builded and tested, which also provides the key artifacts and information items for baseline.





# 6.4.5 Design Definition process
## 1. Prepare for software system design definition
### a. Define the design definition strategy, consistent with the selected life cycle model and anticpated design artifacts.
### b. Select and prioritize design principles and design characteristics.
### c. Identify and plan for the necessary enabling systems or services needed to support design definition.
### d. Obtain or acquire access to the enabling systems or services to be used.

## 2. Establish designs related to each software system element.
### a. Transform architectural and design characteristics into the design of software system elements.
### b. Define and prepare or obtain the necessary design enablers.
### c. Examine design alternatives and feasibility of implementation.
### d. Refine or define the interfaces among the software system elements and with external entities.
### e. Establish the design artifacts.

## 3. Asses alternatives for obtaining software system elements.
### a. Determine technology required for each element composing the software system.
### b. Identify candidate alternatives for the software system elements.
### c. Assess each candidate alternative against criteria developed from expected design characteristics and element requirements to determine suitability for the inteded application.
### d. Choose the preferred alternatives among candidate design solutions for the software system elements.

## 4. Manage the design.
### a. Capture the design and rationale.
### b. Establish tracability between the detailed design elements, the system/software requirements, and the architectural entities of the software system architecture. 
### c. Determine the status of the software system and element design.
### d. Provide key artifacts and information items that have been selected for baselines.

