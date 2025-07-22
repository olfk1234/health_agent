

import streamlit as st
import uuid

from jinja2.nodes import Break
from langchain.chains.question_answering.map_reduce_prompt import messages
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.types import Command
from streamlit.external.langchain import StreamlitCallbackHandler
from chatbot import builtGraph

if "messages" not in st.session_state:
    st.session_state.messages = []
if "initial_interaction_done" not in st.session_state:
    st.session_state.initial_interaction_done = False

counter = 0
config = {"configurable": {"thread_id": "1"}}
st.session_state.first_run_done = False
def main(config):
    #####
    st.title("Agent to give dietary advice")
    st.write("Ask a relevant question.")

    if prompt := st.chat_input():
        st.chat_message("user").write(prompt)
        with st.chat_message("assistant"):
            # Initialize the Streamlit callback handler
            st_callback = StreamlitCallbackHandler(st.container())

            if not st.session_state.initial_interaction_done:
                # This is the first interaction
                st.session_state.initial_interaction_done = True
                response = builtGraph.invoke({"messages":[HumanMessage(content = prompt)]}, {"callbacks": [st_callback], "configurable": {"thread_id": "3"}})
                # Display the response
                st.session_state.messages.append({
                    "role": "assistant",
                    "content": response
                })
                for chunk in response:
                    st.write(chunk)
            else:
                # Invoke the agent executor with the callback handler
                response = builtGraph.stream(
                    Command(resume=prompt), {"callbacks": [st_callback], "configurable": {"thread_id": "3"}}
                )
                # Display the response
                st.session_state.messages.append({
                    "role": "human-expert",
                    "content": response
                })
                for chunk in response:
                    st.write(chunk)

    # user_question = st.text_input("Your question:", "")
    # restart_outer_loop = True
    # tool_encountered = True
    # tool_list = []
    # ######
    # if st.button("Ask") and user_question:
    #     with st.spinner("Thinking..."):
    #         result = builtGraph.invoke({"messages":[HumanMessage(content=user_question)]}, config)
    #         while tool_encountered:
    #             for i in range(len(result["messages"])-1, 0, -1):
    #                 st.write("0000000000000000", result["messages"][i])
    #                 if result["messages"][i].type == "tool":
    #                     tool_list.append(result["messages"][i])
    #                 else:
    #                     break
    #                 if len(tool_list) > 0:
    #                     result = builtGraph.invoke({"messages": tool_list}, config)
    #                     tool_encountered = True
    #         ###
    #         st.session_state.first_run_done = True
    #         st.subheader("Response")
    #         st.write(result["messages"])

if __name__ == "__main__":
    main(config)