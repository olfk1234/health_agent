

import chainlit as cl
from langchain_core.messages import HumanMessage
from langchain_core.runnables import RunnableConfig

from chatbot import builtGraph


config = {"configurable": {"thread_id": "1"}}


@cl.on_message
async def on_message(msg: cl.Message):
    config = {"configurable": {"thread_id": cl.context.session.id}}
    cb = cl.LangchainCallbackHandler()
    final_answer = cl.Message(content="")

    for msg, metadata in builtGraph.stream({"messages": [HumanMessage(content=msg.content)]}, stream_mode="messages",
                                      config=RunnableConfig(callbacks=[cb], **config)):
        if (
                msg.content
                and not isinstance(msg, HumanMessage)
                and metadata["langgraph_node"] == "final"
        ):
            await final_answer.stream_token(msg.content)

    await final_answer.send()