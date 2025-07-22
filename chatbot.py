
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.constants import START
from langgraph.graph import StateGraph, END, MessagesState
from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.types import interrupt
from pint import UnitRegistry, Quantity
load_dotenv()
if not os.environ.get("OPENAI_API_KEY"):
    os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
model = ChatOpenAI(model="gpt-4o")

def tdeetool(sex, weight, unitsWeight, height, unitsHeight, foot, inch, age, activity):
    """
    Do not assume any parameters if unknown or null. Ask user
    Calculates TDEE
    Your BMR represents the number of calories your body needs to maintain its current weight without any additional activity. You can calculate it using the Mifflin-St Jeor equation:
    Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161

    If the weight is not in kg, the AI model should convert it to kg. Explicitly mention the conversion if it takes place.

    If the height is not in cm, the AI model should convert it to cm. Explicitly mention the conversion if it takes place.
    :param sex: True if male, False if female
    :param weight: entered weight
    :param unitsWeight: kg, stone, or lb, or any other unit of weight. kg unless specified
    :param height: entered height. Set height to 1 if unitsHeight is feet and inch
    :param unitsHeight: cm, inches, feet and inch, yards, or any other unit of length. cm unless specified
    :param age: age of person in years. CANNOT BE NULL
    :param foot: the feet value if unitsHeight is feet and inch
    :param inch: the inch value if unitsHeight is feet and inch
    :param activity:
    sedentary (little to no exercise): BMR x 1.2
    light_active (light exercise/sports 1-3 days/week): BMR x 1.375
    moderate_active (moderate exercise/sports 3-5 days/week): BMR x 1.55
    active (hard exercise/sports 6-7 days a week): BMR x 1.725
    super_active (very hard exercise & physical job or 2x training): BMR x 1.9
    :return: TDEE
    """
    from pint import UnitRegistry


    weight = Quantity(str(weight) + " " + unitsWeight).to('kilograms')
   #test

    if 'and' in unitsHeight:
        inches = 12 * foot + inch
        height = Quantity(str(inches) + "inches").to('centimeters')
    else:
        height= Quantity(str(height)+unitsHeight).to('centimeters')
    height = height.magnitude
    weight = weight.magnitude

    try:
        if sex:
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
        else:
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
    except:
        bmr = 0
    activity_dict = {"sedentary":1.2,"light_active":1.375, "moderate_active":1.55, "active":1.725, "super_active":1.9 }
    return activity_dict[activity] * bmr



def pound_loss_estimator(starting_weight, ending_weight, loss_a_week, loss_amount = None):
    """
    Do not assume any parameters if unknown or null. Ask user
    loss_a_week and loss_amount MUST have the same units
    :param loss_amount: The amount of weight you want to lose
    :param loss_a_week: Amount of weight a week you want to lose
    :param starting_weight:Starting weight
    :param ending_weight: Ending weight.

    :return:
    """
    if loss_amount == None:
        loss_amount = starting_weight - ending_weight
    return loss_amount / loss_a_week

def protein_fat_carb_amnt(tdee, calorie_deficit,sex, weight, unitsWeight, height, unitsHeight, foot, inch, age, activity, macros):
    """
    Do not assume any parameters if unknown or null. Ask user
    Calculates the amount of fat protein and/or carbs
    :param macros: macro to calculate. Can be either "protein", "fat", or "carbs"
    :param tdee: The Total Daily Energy Expenditure
    :param calorie_deficit: The calorie deficit or surplus to be at per day. slow_loss is the loss of half a pound a week.
    medium_loss is the loss of a pound a week. medium_fast_loss is the loss of 1.5 pounds a week. fast_loss is a deficit of 1000 pounds a day, which is the loss of 2 or more pounds a week.
    A slow_surplus is +0.5 pounds a week or +250 calories a day. medium_surplus is + 1 pound a week or +500 calories a day. medium_fast_suprlus is +1.5 pounds a week or +750 cal a day. A fast_surplus is +2 pounds a week or +1000 calories a day.
    If this param is missing. Ask the user how fast or how slow they want to lose/gain weight (slow, medium, medium-fast, or fast)
    --> The following parameters are only used when no tdee is given, else, all of these are None
     :param sex: True if male, False if female
    :param weight: entered weight
    :param unitsWeight: kg, stone, or lb, or any other unit of weight. kg unless specified
    :param height: entered height. Set height to 1 if unitsHeight is feet and inch
    :param unitsHeight: cm, inches, feet and inch, yards, or any other unit of length. cm unless specified
    :param age: age of person in years
    :param foot: the feet value if unitsHeight is feet and inch
    :param inch: the inch value if unitsHeight is feet and inch
    :param activity:
    sedentary (little to no exercise): BMR x 1.2
    light_active (light exercise/sports 1-3 days/week): BMR x 1.375
    moderate_active (moderate exercise/sports 3-5 days/week): BMR x 1.55
    active (hard exercise/sports 6-7 days a week): BMR x 1.725
    super_active (very hard exercise & physical job or 2x training): BMR x 1.9
    :return: amount of macro specified
    """
    cal_dict = {"slow_surplus": 250, "medium_surplus":500, "medium_fast_surplus":750, "fast_surplus":1000,"slow_loss": -250, "medium_loss":-500, "medium_fast_loss":-750, "fast_loss":-1000}
    if tdee == None:
        tdee = tdeetool(sex, weight, unitsWeight, height, unitsHeight, foot, inch, age, activity)
    macro_dict = {"protein": 0.35, "fat": 0.2, "carbs": 0.45}
    return macro_dict[macros] * (tdee+cal_dict[calorie_deficit])

def carb_amnt(tdee,sex, weight, unitsWeight, height, unitsHeight, foot, inch, age, activity, calorie_deficit = "slow_loss"):
    """
    Do not assume any parameters if unknown or null. Ask user
    The amount of carbs that a person is recommended to take per day IN CALORIES
    :param tdee: The Total Daily Energy Expenditure
    :param calorie_deficit: The calorie deficit or surplus to be at per day. slow_loss is the loss of half a pound a week.
    medium_loss is the loss of a pound a week. medium_fast_loss is the loss of 1.5 pounds a week. fast_loss is a deficit of 1000 pounds a day, which is the loss of 2 or more pounds a week.
    A slow_surplus is +0.5 pounds a week or +250 calories a day. medium_surplus is + 1 pound a week or +500 calories a day. medium_fast_suprlus is +1.5 pounds a week or +750 cal a day. A fast_surplus is +2 pounds a week or +1000 calories a day.
    --> The following parameters are only used when no tdee is given, else, all of these are None
     :param sex: True if male, False if female
    :param weight: entered weight
    :param unitsWeight: kg, stone, or lb, or any other unit of weight. kg unless specified
    :param height: entered height. Set height to 1 if unitsHeight is feet and inch
    :param unitsHeight: cm, inches, feet and inch, yards, or any other unit of length. cm unless specified
    :param age: age of person in years
    :param foot: the feet value if unitsHeight is feet and inch
    :param inch: the inch value if unitsHeight is feet and inch
    :param activity:
    sedentary (little to no exercise): BMR x 1.2
    light_active (light exercise/sports 1-3 days/week): BMR x 1.375
    moderate_active (moderate exercise/sports 3-5 days/week): BMR x 1.55
    active (hard exercise/sports 6-7 days a week): BMR x 1.725
    super_active (very hard exercise & physical job or 2x training): BMR x 1.9
    Ask user for activity if null
    :return: carbs amount
    """

    return protein_fat_carb_amnt(tdee, calorie_deficit,sex, weight, unitsWeight, height, unitsHeight, foot, inch, age, activity, "carbs")

def fat_amnt(tdee,sex, weight, unitsWeight, height, unitsHeight, foot, inch, age, activity, calorie_deficit = "slow_loss"):
    """
    Do not assume any parameters if unknown or None. Ask user
    The amount of fat that a person is recommended to take per IN CALORIES
    :param tdee: The Total Daily Energy Expenditure
    :param calorie_deficit: The calorie deficit or surplus to be at per day. slow_loss is the loss of half a pound a week.
    medium_loss is the loss of a pound a week. medium_fast_loss is the loss of 1.5 pounds a week. fast_loss is a deficit of 1000 pounds a day, which is the loss of 2 or more pounds a week.
    A slow_surplus is +0.5 pounds a week or +250 calories a day. medium_surplus is + 1 pound a week or +500 calories a day. medium_fast_suprlus is +1.5 pounds a week or +750 cal a day. A fast_surplus is +2 pounds a week or +1000 calories a day.
    --> The following parameters are only used when no tdee is given, else, all of these are None
     :param sex: True if male, False if female
    :param weight: entered weight
    :param unitsWeight: kg, stone, or lb, or any other unit of weight. kg unless specified
    :param height: entered height. Set height to 1 if unitsHeight is feet and inch
    :param unitsHeight: cm, inches, feet and inch, yards, or any other unit of length. cm unless specified
    :param age: age of person in years
    :param foot: the feet value if unitsHeight is feet and inch
    :param inch: the inch value if unitsHeight is feet and inch
    :param activity:
    sedentary (little to no exercise): BMR x 1.2
    light_active (light exercise/sports 1-3 days/week): BMR x 1.375
    moderate_active (moderate exercise/sports 3-5 days/week): BMR x 1.55
    active (hard exercise/sports 6-7 days a week): BMR x 1.725
    super_active (very hard exercise & physical job or 2x training): BMR x 1.9
    Ask user for activity if null
    :return: fat amount
    """

    return  protein_fat_carb_amnt(tdee, calorie_deficit,sex, weight, unitsWeight, height, unitsHeight, foot, inch, age, activity, "fat")

def protein_amnt(tdee, sex, weight, unitsWeight, height, unitsHeight, foot, inch, age, activity, calorie_deficit = "slow_loss"):
    """
    Do not assume any parameters if unknown or null. Ask user
    The amount of protein that a person is recommended to take per day IN CALORIES
    :param tdee: The Total Daily Energy Expenditure
    :param calorie_deficit: The calorie deficit or surplus to be at per day. slow_loss is the loss of half a pound a week.
    medium_loss is the loss of a pound a week. medium_fast_loss is the loss of 1.5 pounds a week. fast_loss is a deficit of 1000 pounds a day, which is the loss of 2 or more pounds a week.
    A slow_surplus is +0.5 pounds a week or +250 calories a day. medium_surplus is + 1 pound a week or +500 calories a day. medium_fast_suprlus is +1.5 pounds a week or +750 cal a day. A fast_surplus is +2 pounds a week or +1000 calories a day.
    --> The following parameters are only used when no tdee is given, else, all of these are None
     :param sex: True if male, False if female
    :param weight: entered weight
    :param unitsWeight: kg, stone, or lb, or any other unit of weight. kg unless specified
    :param height: entered height. Set height to 1 if unitsHeight is feet and inch
    :param unitsHeight: cm, inches, feet and inch, yards, or any other unit of length. cm unless specified
    :param age: age of person in years
    :param foot: the feet value if unitsHeight is feet and inch
    :param inch: the inch value if unitsHeight is feet and inch
    :param activity:
    sedentary (little to no exercise): BMR x 1.2
    light_active (light exercise/sports 1-3 days/week): BMR x 1.375
    moderate_active (moderate exercise/sports 3-5 days/week): BMR x 1.55
    active (hard exercise/sports 6-7 days a week): BMR x 1.725
    super_active (very hard exercise & physical job or 2x training): BMR x 1.9
    Ask user for activity if null
    :return: protein amount
    """


    return  protein_fat_carb_amnt(tdee, calorie_deficit,sex, weight, unitsWeight, height, unitsHeight, foot, inch, age, activity, "protein")

def call_model(state:MessagesState) -> MessagesState:
    model_tools = model.bind_tools([pound_loss_estimator, carb_amnt, fat_amnt, protein_amnt, tdeetool],  parallel_tool_calls=False)
    if len(state["messages"]) < 3:
        state["messages"] += [SystemMessage(content="You are a LLM that is tasked with answering questions involving weight, exercise, or dieting. Politely decline to answer the question if the prompt has nothing to do with these things given the context. If any variant of protein, fat, or carb is mentioned AND we want to find the amount of specified macronitrient the user can have OR the amount of calories of the macronutrient the user can have, call the tool that ends in _amnt that corresponds to each macronutrient specified (protein, fat, or carb). If you do not know parameter required for a tool, ask the user for it. Do not just input null for a parameter, except if you cannot figure out the tdee when calling the protein_amnt, fat_amnt, or carb_amnt tools. Always interpret the number returned by tools after calling the tools. When giving a number state to always consult a medical professional")]
    results = model_tools.invoke(state["messages"])

    return {"messages":state["messages"] + [results]}



memory = MemorySaver()

graph  = StateGraph(MessagesState)

graph.add_node("model", call_model)
graph.add_node("tools", ToolNode([pound_loss_estimator, carb_amnt, fat_amnt, protein_amnt, tdeetool]))
graph.add_edge(START, "model")
graph.add_conditional_edges( "model", tools_condition, {"tools": "tools", "__end__": END})
graph.add_edge("tools", "model")


builtGraph = graph.compile(checkpointer=memory)




