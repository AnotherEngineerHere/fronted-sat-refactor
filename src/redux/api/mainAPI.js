import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainAPI = createApi({
  reducerPath: "mainAPI",
  baseQuery: fetchBaseQuery({
    /*
     * Variable url de donde se está corriendo el back.
     */
    baseUrl: "http://localhost:9095/satapi/",
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().tokenAuth.token !== ""
          ? getState().tokenAuth.token
          : localStorage.getItem("token");
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      // headers.set("authorization", `Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VycklkIjoiMTIiLCJyb2xlIjoiUk9MRV9BZG1pbixST0xFX0FkbWluLUFjYWRlbWljLVByb2csUk9MRV9BZG1pbi1BcHBvaW50bWVudCxST0xFX0FkbWluLUFwcG9pbnRtZW50UGVyc29uLFJPTEVfQWRtaW4tRmFjdWx0eSxST0xFX0FkbWluLUxvY2FsLUNvbmRpdGlvbixST0xFX0FkbWluLVBlcnNvbixST0xFX0FkbWluLVRhc2ssUk9MRV9BZG1pbi1UYXNrVHlwZSxST0xFX0FkbWluLVRocmVzaG9sZCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2Mzk4Njk1MTUsImV4cCI6MTY0MDczMzUxNX0.NqqgXPfiuuuvO3iH6aPHfWYLYUfmKCFH8LLz3AnDz2HY5qGAvFReg81LF4P1yyYKlu3iXH48R0RWY7NoAr8WrPLFVMBEzqw9HS1KFYHJkF5jrrJ4SqDiVU3trXqqvT_KdlX9DKn8gt2XFFwhQHRgDr5Bs9yeopeLZy45FQYA3YgiLqnvnkih7vl8cusjKmauW_xwZdiJwsC9R9CWV9PcQi0v1DxDLeIsc8HTdVC4ZnmgqpJGq1-EQdYaRCnkxG36nvI5fFOb4K_tSFK6PDzw7LnxPjKpzkICwI6dxWi_9pB58FLEpqQILbvi8PhXr0hKCOniiPubedJroVmonkrF9CuMYqSfBdH98z6yw_Pbr_WgoIGUz4qsRzserZM05Rp5LrBj2s94RIcVxZR_Mx5Wz2AYL4RPwMfzDCJMF9z60_AkzpZoV5jzWWx0_wBh1nCuYBbvAiYNMobshKAAn5MVi9Y2LsQsF9F5F7SdwPVhQOGXT5f4l-LZQy9NDjdNrxVhF9T-7RhWiaodwiHa6eXpGYaunXA3nGL4-_c1lQaQ3RhnajVwaPl9NTAvMbM_dTVE2tOthP2tmBWQ_lCWPbmmouxbNNQBRQf4YBcj6qA8Izt20c3wotShNsvS2sC4-xNAC4afgLNm1jc1kJLZUDQuasgeUCg1H5ZK70D90Ll6ZBE`);
      // headers.set("authorization", "Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VycklkIjoiMTEiLCJyb2xlIjoiUk9MRV9EaXJlY3RpdmUtQWNhZGVtaWMtUHJvZyxST0xFX0RpcmVjdGl2ZS1BcHBvaW50bWVudCxST0xFX0RpcmVjdGl2ZS1BcHBvaW50bWVudFBlcnNvbixST0xFX0RpcmVjdGl2ZS1GYWN1bHR5LFJPTEVfRGlyZWN0aXZlLUxvY2FsLUNvbmRpdGlvbixST0xFX0RpcmVjdGl2ZS1QZXJzb24sUk9MRV9EaXJlY3RpdmUtU3VwcG9ydGNlbnRlcixST0xFX0RpcmVjdGl2ZS1UYXNrLFJPTEVfRGlyZWN0aXZlLVRhc2tUeXBlLFJPTEVfRGlyZWN0aXZlLVRocmVzaG9sZCxST0xFX0RpcmVjdG9yIiwidXNlcm5hbWUiOiJkaXJlY3RvciIsImlhdCI6MTYzOTg3MDgwMiwiZXhwIjoxNjQwNzM0ODAyfQ.rGo3OfODeZiBF44Ei2t0NXq0Sii0UuTtyHiJ0Z9UQ5hAbhfz6v2Qaj4ZE5SiYm_lS3qadDLKLyWyNMWqkGnN8rnljbYmuygqliXb8LYYj_s5hQlCwsSlMCBdQEnHi-_9Ya0LYhZ3WO0BKZaQ20RF0HAlfIJkqDBcw1uexWfh47dzfDCFKq3-wYkzlTq60hChyJfoFR-c87iKEmO-LT_7jbUkWhWzMP_D3W67nWWJNzja9JFI7yz-lnp_FFRM84OzR6SQs78d-A22CJwNZKNEK_XKF7YZdWHpbDnINwvQM2xHwi_SbAQwtrg2JPp2iPNPjryc0Pl4OPaYDMbuFs8ez3nbUuwfm7L8_-3cKcFgFw_H-SwYoBHW7pE2cdDd0etP1my_qB4haJm0bS1e2_5e4tNcZk6yDcantEWo2WKRBWHHM-c1vyW03eqsnzL29YkzVAT0QamBTquQ5w66bODNpsy5vezLBoKNDcZ9r45pWj98yfc5UlQgXNdJu2LV2Usn-3450aQCRccO6Qopb7dp0vqAF_682FUUvZefIe-Ox9Jqm0r8bK3HoxW6CyZMeN2CS5HV70jz4DlS2rqjvP9d03Not0u7wttYUJedlVDz4Pv8qArm7TboIDmA--VQScZi4K8hOepODVaB4qi6CepLGcQDJ3wdVqeH7ySLyUeHIwY");
      return headers;
    },
  }),

  /*
   * Contiene las peticiones GET-POST-PUT-DELETE
   * necesarias para el funcionamiento de la aplicación.
   */
  endpoints: (builder) => ({
    getStudentsByProgram: builder.query({
      query: () => "person/",
    }),

    getSupportCenter: builder.query({
      query: () => "support-center/",
    }),

    postAppointment: builder.mutation({
      query: (appointment) => ({
        url: "appointment/",
        method: "POST",
        body: appointment,
      }),
    }),

    putAppointment: builder.mutation({
      query: (appointment) => ({
        url: `appointment/`,
        method: "PUT",
        body: appointment,
      }),
    }),

    getAppointmentsByPerson: builder.query({
      query: (personId) => `appointment/findByPerson?personId=${personId}`,
    }),

    //LocalCondition
    getLocalConditions: builder.query({
      query: (userInfo) => `${userInfo}/local-condition`,
    }),

    createLocalCondition: builder.mutation({
      query: ({ userInfo, ...localCondition }) => ({
        url: `${userInfo}/local-condition`,
        method: "POST",
        body: localCondition.localConditon,
      }),
    }),
    updateLocalCondition: builder.mutation({
      query: ({ userInfo, ...localCondition }) => ({
        url: `${userInfo}/local-condition`,
        method: "PUT",
        body: localCondition.localConditon,
      }),
    }),

    deleteLocalCondition: builder.mutation({
      query: ({ localconid, userInfo }) => ({
        url: `${userInfo}/local-condition/${localconid}`,
        method: "DELETE",
      }),
    }),

    //RemoteCondition

    getRemoteCondition: builder.query({
      query: (userInfo) => `${userInfo}/remotecondition`,
    }),
    createRemoteCondition: builder.mutation({
      query: ({ userInfo, ...remoteCondition }) => ({
        url: `${userInfo}/remotecondition`,
        method: "POST",
        body: remoteCondition.remoteCondition,
      }),
    }),
    updateRemoteCondition: builder.mutation({
      query: ({ userInfo, ...remoteCondition }) => ({
        url: `${userInfo}/remotecondition`,
        method: "PUT",
        body: remoteCondition.remoteCondition,
      }),
    }),
    deleteRemoteCondition: builder.mutation({
      query: ({ remoteconid, userInfo }) => ({
        url: `${userInfo}/remotecondition/${remoteconid}`,
        method: "DELETE",
      }),
    }),

    // Threshold
    getThresholds: builder.query({
      query: (userInfo) => `${userInfo}/threshold`,
    }),
    getThreshold: builder.query({
      query: (userInfo, idThreshold) => `${userInfo}/threshold/${idThreshold}`,
    }),
    postThreshold: builder.mutation({
      query: ({ userInfo, ...threshold }) => ({
        url: `${userInfo}/threshold`,
        method: "POST",
        body: threshold.thresholdToAdd,
      }),
    }),
    updateThreshold: builder.mutation({
      query: ({ userInfo, ...threshold }) => ({
        url: `${userInfo}/threshold`,
        method: "PUT",
        body: threshold.thresholdToEdit,
      }),
    }),
    deleteThreshold: builder.mutation({
      query: ({ thresholdId, userInfo }) => ({
        url: `${userInfo}/threshold/${thresholdId}`,
        method: "DELETE",
      }),
    }),

    //Precondition
    getPreconditions: builder.query({
      query: (userInfo) => `${userInfo}/precondition`,
    }),
    getPrecondition: builder.query({
      query: (userInfo, id) => `${userInfo}/precondition/${id}`,
    }),
    getLocalConditionsOfPrecondition: builder.query({
      query: (userInfo, id) => `${userInfo}/precondition/localcondition/${id}`,
    }),
    getRemoteConditionsOfPrecondition: builder.query({
      query: (userInfo, id) => `${userInfo}/precondition/remocondition/${id}`,
    }),
    createPrecondition: builder.mutation({
      query: ({ userInfo, ...precondition }) => ({
        url: `${userInfo}/precondition`,
        method: "POST",
        body: precondition.preconditionToAdd,
      }),
    }),
    updatePrecondition: builder.mutation({
      query: ({ userInfo, ...precondition }) => ({
        url: `${userInfo}/precondition`,
        method: "PUT",
        body: precondition.preconditionToEdit,
      }),
    }),
    deletePrecondition: builder.mutation({
      query: ({ id, userInfo }) => ({
        url: `${userInfo}/precondition/${id}`,
        method: "DELETE",
      }),
    }),

    /** Petición GET que me retorna las posibles tareas del sistema.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @returns Tareas
     */
    getTasks: builder.query({
      query: (userInfo) => `${userInfo}/task`,
    }),
    /** Petición GET que me retorna los posibles tipos de tareas del sistema.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @returns Tipos de tareas
     */
    getTasksType: builder.query({
      query: (userInfo) => `${userInfo}/task-type`,
    }),
    /** Petición POST para agregar una tarea.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param task Objeto con toda la información de una tarea.
     * @author Grupo de proyecto integrador 2
     */
    createTask: builder.mutation({
      query: ({ userInfo, ...task }) => ({
        url: `${userInfo}/task`,
        method: "POST",
        body: task.taskToAdd,
      }),
    }),
    /** Petición PUT para editar una tarea.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param task Objeto con la nueva información de la tarea.
     * @author Grupo de proyecto integrador 2
     */
    updateTask: builder.mutation({
      query: ({ userInfo, ...task }) => ({
        url: `${userInfo}/task`,
        method: "PUT",
        body: task.taskToEdit,
      }),
    }),
    /** Petición DELETE para eliminar una tarea.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param taskId Identificador de la tarea
     * @author Grupo de proyecto integrador 2
     */
    deleteTask: builder.mutation({
      query: ({ taskId, userInfo }) => ({
        url: `${userInfo}/task/${taskId}`,
        method: "DELETE",
      }),
    }),

    /**
     * Petición GET que retorna los niveles de riesgo.
     */
    getRiskLevel: builder.query({
      query: () => `alert-risk-level`,
    }),

    /** Petición GET que me retorna un nivel de nivel de riesgo según su id.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param id Identificador del nivel de riesgo
     * @returns Nivel de riesgo dado el id
     */
    getRiskLevelWithId: builder.query({
      query: (userInfo, id) => `${userInfo}/alert-risk-level/${id}`,
    }),

    /**
     * Petición GET que retorna los tipos de alerta.
     */
    getAlertsType: builder.query({
      query: () => `alert-type`,
    }),

    /**
     * Petición GET que retorna las alertas predefinidas.
     */
    getPreAlert: builder.query({
      query: () => "alert/",
    }),

    /** Petición POST para agregar una alerta predefinida.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param prealert Objeto con toda la información de la alerta predefinida.
     * @author Dennys Mosquera
     */
    postPreAlert: builder.mutation({
      query: (userInfo, ...prealert) => ({
        url: `${userInfo}/alert/`,
        method: "POST",
        body: prealert,
      }),
    }),

    /** Petición DELETE para eliminar una alerta predefinida.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param alertId Identificador de alerta predefinida.
     * @author Dennys Mosquera
     */
    deletePreAlert: builder.mutation({
      query: ({ alertId, userInfo }) => ({
        url: `${userInfo}/alert/${alertId}`,
        method: "DELETE",
      }),
    }),

    /** Petición PUT para editar una alerta predefinida.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param alert Objeto con la nueva información de la alerta.
     * @author Dennys Mosquera
     */
    updatePreAlert: builder.mutation({
      query: ({ userInfo, ...alert }) => ({
        url: `${userInfo}/alert`,
        method: "PUT",
        body: alert.prealert,
      }),
    }),

    /** Petición POST para agregar un nivel de riesgo.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param alertrisklevel Objeto con toda la información del nivel de riesgo.
     * @author Dennys Mosquera
     */
    postAlertRiskLevel: builder.mutation({
      query: (userInfo, ...alertrisklevel) => ({
        url: `${userInfo}/alert-risk-level/`,
        method: "POST",
        body: alertrisklevel,
      }),
    }),

    /**
     * Petición GET que retorna los niveles de riesgo.
     */
    getAlertRiskLevel: builder.query({
      query: () => "alert-risk-level/",
    }),

    /** Petición DELETE para eliminar un nivel de riesgo.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param alertRskLevelId Identificador del nivel de riesgo.
     * @author Dennys Mosquera
     */
    deleteAlertRiskLevel: builder.mutation({
      query: ({ alertRskLevelId, userInfo }) => ({
        url: `${userInfo}/alert-risk-level/${alertRskLevelId}`,
        method: "DELETE",
      }),
    }),

    /** Petición PUT para editar un nivel de riesgo.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param alertRiskLevel Objeto con la nueva información del nivel de riesgo.
     * @author Dennys Mosquera
     */
    updateAlertRiskLevel: builder.mutation({
      query: ({ userInfo, ...alertRiskLevel }) => ({
        url: `${userInfo}/alert-risk-level`,
        method: "PUT",
        body: alertRiskLevel.alertrisklevel,
      }),
    }),

    /**
     * Petición GET que retorna las instancias de alertas.
     */
    getAlertInstance: builder.query({
      query: () => "alert-instance/",
    }),

    /** Petición POST para agregar una instancia de alerta.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param alertinstance Objeto con toda la información de la instancia de la alerta.
     * @author Dennys Mosquera
     */
    postAlertInstance: builder.mutation({
      query: (userInfo, ...alertinstance) => ({
        url: `${userInfo}/alert-instance/`,
        method: "POST",
        body: alertinstance,
      }),
    }),

    getRole: builder.query({
      query: () => "person-role/4",
    }),

    /** Petición GET que me retorna los tipos de alerta.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @returns Tipo de alerta
     */
    getAlertType: builder.query({
      query: (userInfo) => `${userInfo}/alert-types/`,
    }),

    /** Petición POST para agregar un tipo de alerta.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param alerttype Objeto con toda la información de un tipo de alerta.
     * @author Dennys Mosquera
     */
    postAlertType: builder.mutation({
      query: (userInfo, ...alerttype) => ({
        url: `${userInfo}/alert-types/`,
        method: "POST",
        body: alerttype,
      }),
    }),

    /** Petición DELETE para eliminar un tipo de alerta.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param alerttpId Identificador del tipo de alerta.
     * @author Dennys Mosquera
     */
    deleteAlertType: builder.mutation({
      query: ({ alerttpId, userInfo }) => ({
        url: `${userInfo}/alert-types/${alerttpId}`,
        method: "DELETE",
      }),
    }),

    /** Petición PUT para editar un nivel de riesgo.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param alertType Objeto con la nueva información del tipo de alerta.
     * @author Dennys Mosquera
     */
    updateAlertType: builder.mutation({
      query: ({ userInfo, ...alertType }) => ({
        url: `${userInfo}/alert-types`,
        method: "PUT",
        body: alertType.alerttypee,
      }),
    }),

    /** Petición GET que me retorna las alertas automáticas generadas.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @returns Alertas automáticas
     * @author Dennys Mosquera
     */
    getAutoAlerts: builder.query({
      query: (userInfo) => `${userInfo}/autoalert`,
    }),

    /** Petición GET que me retorna las alertas automáticas de una tarea.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param idTask Identificador de la tarea
     * @returns Alertas automáticas teniendo en cuenta la tarea.
     * @author Grupo de proyecto integrador 2
     */
    getAutoAlertsOfTask: builder.query({
      query: ({ idTask, userInfo }) => `${userInfo}/task/autoalert/${idTask}`,
    }),

    /** Petición GET que me retorna las alertas automáticas de una tarea.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @returns Alertas automáticas teniendo en cuenta la tarea.
     * @author Grupo de proyecto integrador 2
     */
    getAutomaticAlerts: builder.query({
      query: (userInfo) => `${userInfo}/autoalert`,
    }),
     /** Petición POST para agregar una alerta automática.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param autoAlert Objeto con toda la información de una alerta automática.
     * @author Dennys Mosquera
     */
    createAutoAlert: builder.mutation({
      query: ({ userInfo, ...autoAlert }) => ({
        url: `${userInfo}/autoalert`,
        method: "POST",
        body: autoAlert.autoAlertToAdd,
      }),
    }),
    /** Petición PUT para editar una alerta automática.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param autoAlert Objeto con la nueva información de la alerta automática.
     * @author Grupo de proyecto integrador 2
     */
    updateAutoAlert: builder.mutation({
      query: ({ userInfo, ...autoAlert }) => ({
        url: `${userInfo}/autoalert`,
        method: "PUT",
        body: autoAlert.autoAlertToEdit,
      }),
    }),
    /** Petición DELETE para eliminar una alerta automática.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @param autoAlertId Identificador de la alerta automática.
     * @author Dennys Mosquera
     */
    deletAutoAlert: builder.mutation({
      query: ({ autoAlertId, userInfo }) => ({
        url: `${userInfo}/autoalert/${autoAlertId}`,
        method: "DELETE",
      }),
    }),

    /** Petición GET que me retorna los triggers.
     * @param userInfo Tipo de usuario - adm: administrador o directive: directivo
     * @returns Triggers
     * @author Grupo de proyecto integrador 2
     */
    getTriggers: builder.query({
      query: (userInfo) => `${userInfo}/triggerr`,
    }),
    createTrigger: builder.mutation({
      query: ({ userInfo, ...trigger }) => ({
        url: `${userInfo}/triggerr`,
        method: "POST",
        body: trigger.triggerToAdd,
      }),
    }),
    updateTrigger: builder.mutation({
      query: ({ userInfo, ...trigger }) => ({
        url: `${userInfo}/triggerr`,
        method: "PUT",
        body: trigger.triggerToEdit,
      }),
    }),
    deleteTrigger: builder.mutation({
      query: ({ triggId, userInfo }) => ({
        url: `${userInfo}/triggerr/${triggId}`,
        method: "DELETE",
      }),
    }),

    //trigger type
    getTriggerType: builder.query({
      query: (userInfo) => `${userInfo}/triggertype`,
    }),
  }),
});

export const {
  useGetStudentsByProgramQuery,
  useGetSupportCenterQuery,
  useGetAppointmentsByPersonQuery,
  usePostAppointmentMutation,
  usePutAppointmentMutation,
  useGetLocalConditionsQuery,
  useGetThresholdsQuery,
  usePostThresholdMutation,
  useGetRemoteConditionQuery,
  useGetPreconditionsQuery,
  useUpdateThresholdMutation,
  useDeleteThresholdMutation,
  useDeletePreconditionMutation,
  useCreatePreconditionMutation,
  useUpdatePreconditionMutation,
  useCreateLocalConditionMutation,
  useUpdateLocalConditionMutation,
  useDeleteLocalConditionMutation,
  useCreateRemoteConditionMutation,
  useUpdateRemoteConditionMutation,
  useDeleteRemoteConditionMutation,
  useGetPreconditionQuery,
  useGetThresholdQuery,
  useGetLocalConditionsOfPreconditionQuery,
  useGetRemoteConditionsOfPreconditionQuery,
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetRiskLevelQuery,
  useGetAlertsTypeQuery,
  useGetTasksTypeQuery,
  useDeleteAlertTypeMutation,
  useGetAlertTypeQuery,
  useDeletePreAlertMutation,
  useDeleteAlertRiskLevelMutation,
  useGetAlertRiskLevelQuery,
  useUpdateAlertTypeMutation,
  useUpdatePreAlertMutation,
  useUpdateAlertRiskLevelMutation,
  useGetAutomaticAlertsQuery,
  useCreateAutoAlertMutation,
  useUpdateAutoAlertMutation,
  useGetAutoAlertsQuery,
  useGetPreAlertQuery,
  usePostPreAlertMutation,
  useGetRoleQuery,
  usePostAlertInstanceMutation,
  usePostAlertRiskLevelMutation,
  useDeletAutoAlertMutation,
  usePostAlertTypeMutation,
  useGetTriggersQuery,
  useCreateTriggerMutation,
  useUpdateTriggerMutation,
  useDeleteTriggerMutation,
  useGetTriggerTypeQuery,
  useGetAutoAlertsOfTaskQuery,
  useGetAlertInstanceQuery,
  useGetRiskLevelWithIdQuery,
} = mainAPI;
