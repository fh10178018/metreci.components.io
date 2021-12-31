/*
 * @Author: HanFang
 * @Date: 2021-12-22 13:40:22
 * @Last Modified by: HanFang
 * @Last Modified time: 2021-12-31 11:14:22
 */
import React, { useContext } from "react";
import mitt, { Emitter, EventType } from "mitt";

const emitter: Emitter<Record<EventType, unknown>> = mitt();

export interface MittContextType {
  emitter: Emitter<Record<EventType, unknown>>;
}

const MittContext = React.createContext<MittContextType>({ emitter });

export const MittProvider: React.FC = ({ children }) => {
  return (
    <MittContext.Provider value={{ emitter }}>{children}</MittContext.Provider>
  );
};

export const useMitt = (): MittContextType => useContext(MittContext);
