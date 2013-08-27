var firmCardFullTmpl = '<div class="dg-map-firm" id="dg-map-firm-<%=firm.id%>">\n\
    <div class="dg-map-firm-bullet"></div>\n\
    <h2 class="dg-map-firm-title dg-map-result-title">\n\
        <a id="<%=firm.id%>" class="pseudo link-natural link-text"\n\
           href="javascript:void(0)"><%=firm.name%></a>\n\
    </h2>\n\
</div>\n\
<div id="dg-map-firm-full-<%=firm.id%>" class="dg-map-firm-full" style="display:none;">\n\
    <!--Name and adress-->\n\
    <ul class="dg-map-firm-box">\n\
        <li class="dg-map-firm-row dg-map-firm-address"><%=firm.geometry_name%>\n\
            <% if(firm.additional_info && firm.additional_info.office) { %>\n\
            <span class="note"> &mdash; <%=firm.additional_info.office%></span>\n\
            <% } %>\n\
        </li>\n\
    </ul>\n\
    <!--Subcats-->\n\
    <ul class="dg-map-firm-box dg-map-firm-box-rubric dg-map-firm-subcats">\n\
        <% for (var r = 0, rubrics = firm.rubrics.length; r < rubrics; r++) { %>\n\
            <li><%=firm.rubrics[r].name%><%if (r !== rubrics-1) print(",");%></a></li>\n\
        <% } %>\n\
    </ul>\n\
    <!--Contacts-->\n\
    <ul class="dg-map-firm-box">\n\
        <% for (var c = 0, contacts = firm.contacts.length; c < contacts; c++) { %>\n\
        <li class="dg-map-firm-row <%if (c > 0) {print("additional-addresses");} else {print("dg-map-firm-contacts");} %>">\n\
        <% if (firm.contacts[c].name){ %>\n\
            <div class="dg-map-contact-group"><%=firm.contacts[c].name%></div>\n\
        <% } %>\n\
        <ul class="dg-map-contacts-list">\n\
            <% for (var cont in firm.contacts[c].contacts) { %>\n\
            <li class="dg-map-contacts-row dg-map-row-with-icon dg-map-row-<%=firm.contacts[c].contacts[cont].type %>">\n\
                <span name="dg-map-row-<%=firm.contacts[c].contacts[cont].type%>-<%=firm.id%>"\n\
                <% if (firm.contacts[c].contacts[cont].register_bc_url && firm.contacts[c].contacts[cont].type === "email") {%>\n\
                register_bc_url=<%=firm.contacts[c].contacts[cont].register_bc_url %>\n\
                <% } %>\n\
                >\n\
                    <%=firm.contacts[c].contacts[cont].value%>\n\
                </span>\n\
            </li>\n\
            <% } %>\n\
        </ul>\n\
        </li>\n\
        <% } %>\n\
    </ul>\n\
    <!--Time Shedule-->\n\
    <ul class="dg-map-firm-box">\n\
        <li class="dg-map-firm-row">\n\
            <div class="dg-map-firm-schedule">\n\
                <% if (scheduleData.aroundTheClock) { %>\n\
                <span class="dg-map-firm-schedule-24">24/7</span>\n\
                <div class="dg-map-firm-schedule-short dg-map-firm-schedule-short-24"><%=msgs.works_around_the_clock%></div>\n\
                <% } %>\n\
                \n\
                <% if (scheduleData.byPeriods || scheduleData.allTable || scheduleData.daily) { %>\n\
                    <span class="dg-map-firm-schedule-clock<%if (scheduleData.isOpened) { %> opened<% }%>"></span>\n\
                    <div class="dg-map-firm-schedule-short">\n\
                        <% if (scheduleData.byPeriods || scheduleData.allTable) { %>\n\
                        <a class="dg-map-work-time" id="dg-map-firm-schedule-<%=firm.id%>" href="javascript:void(0)">\n\
                            <% if (scheduleData.todayWorkhours.isRestDay) { %>\n\
                            <%=schedule.msgU("today_is_restday")%>\n\
                            <% } else { %>\n\
                            <%=schedule.msgU("today")%> <%= (scheduleData.todayWorkhours.workFrom !== false) ? scheduleData.todayWorkhours.workFrom : ""%>&ndash;<%= (scheduleData.todayWorkhours.workTo !== false) ? scheduleData.todayWorkhours.workTo : ""%><% if (scheduleData.todayWorkhours.lunchFrom) {%>, <%=msgs.lunch%> <%=scheduleData.todayWorkhours.lunchFrom%>&ndash;<%=scheduleData.todayWorkhours.lunchTo%><% } %>\n\
                            <% } %>\n\
                        </a>\n\
                        \n\
                        <span id="dg-map-icon-expand-<%=firm.id%>" class="link-icon dg-map-icon dg-map-icon-expand"></span>\n\
                        <span id="dg-map-icon-collapse-<%=firm.id%>" class="dg-map-icon dg-map-icon-collapse" style="display: none;"></span>\n\
                        \n\
                        <% } %>\n\
                        <% if (scheduleData.daily) { %>\n\
                        <%=schedule.msgU("daily")%> <%=scheduleData.todayWorkhours.workFrom%>&ndash;<%=scheduleData.todayWorkhours.workTo%><% if (scheduleData.todayWorkhours.lunchFrom) {%>, <%=msgs.lunch%> <%=scheduleData.todayWorkhours.lunchFrom%>&ndash;<%=scheduleData.todayWorkhours.lunchTo%><% } %>\n\
                        <% } %>\n\
                        \n\
                        <span class="dg-map-work-info"><%=scheduleData.msgCrntState + scheduleData.msgHint%></span>\n\
                    </div>\n\
                <% } %>\n\
            </div>\n\
             \n\
            <% if (scheduleData.byPeriods) { %>\n\
            <div class="dg-map-weekly-schedule" id="dg-map-weekly-schedule-<%=firm.id%>" style="display:none;">\n\
                <div class="dg-map-weekly-schedule-inner">\n\
                <% for ( var per in scheduleData.byPeriods) {\n\
                var period = scheduleData.byPeriods[per]; %>\n\
                    <div>\n\
                    <%=period.days%>\n\
                    <span class="dg-map-label"><%=period.labelText%></span><%if (period.lunchFrom) { %>, <%=schedule.msg("lunch")%> <span class="dg-map-label"><%=period.lunchFrom%>&ndash;<%=period.lunchTo%></span>\n\
                    </div>\n\
                <% } %>\n\
                <% } %>\n\
                </div>\n\
            </div>\n\
            <% } %>\n\
            \n\
            \n\
            <% if (scheduleData.allTable) { %>\n\
            <div class="dg-map-weekly-schedule tabled" id="dg-map-weekly-schedule-<%=firm.id%>" style="display:none;">\n\
            <!--<div class="dg-map-weekly-schedule"> -->\n\
                <table class="dg-map-weekly-schedule-table">\n\
                <thead>\n\
                    <tr>\n\
                    <% var i, period;%>\n\
                    <th class="dg-map-schedule-icon">&nbsp;</th>\n\
                    <% for( tab1 in scheduleData.allTable) {\n\
                    period = scheduleData.allTable[tab1];\n\
                    clas = (period.firstDay == scheduleData.weekDayStr) ? \' class="current-day"\' : "";%>\n\
                    <th<%=clas%>><span><%=schedule.msgU(period.firstDay+"_short")%></span></th>\n\
                    <% } %>\n\
                    </tr>\n\
                    </thead>\n\
                    <tbody>\n\
                        <tr<% if (!scheduleData.anyLunchExists) print(\' class="last-row"\');%>>\n\
                        <td class="dg-map-schedule-icon">\n\
                            <span class="dg-map-img-wrap dg-map-icon-schedule" title="<%=schedule.msgU("working_time")%>"></span>\n\
                        </td>\n\
                        <% for( tab2 in scheduleData.allTable) {\n\
                        period = scheduleData.allTable[tab2];\n\
                        clas = (period.firstDay == scheduleData.weekDayStr) ? \' class="current-day"\' : "";%>\n\
                        <td<%=clas%>>\n\
                            <%if (period.workFrom) {%>\n\
                            <div><%=period.workFrom%></div>\n\
                            <div><%=period.workTo%></div>\n\
                            <% } %>\n\
                        </td>\n\
                        <% } %>\n\
                    </tr>\n\
                    <% if (scheduleData.anyLunchExists) { %>\n\
                    <tr class="dinner-time">\n\
                        <td class="dg-map-schedule-icon">\n\
                            <span class="dg-map-img-wrap dg-map-icon-lunch" title="<%=schedule.msgU("lunch")%>"></span>\n\
                        </td>\n\
                        <% for( tab3 in scheduleData.allTable) {\n\
                        period = scheduleData.allTable[tab3];\n\
                        clas = (period.firstDay == scheduleData.weekDayStr) ? \' class="current-day"\' : "";%>\n\
                        <td<%=clas%>>\n\
                            <%if (period.lunchFrom) {%>\n\
                            <div><%=period.lunchFrom%></div>\n\
                            <div><%=period.lunchTo%></div>\n\
                            <% } %>\n\
                        </td>\n\
                        <% } %>\n\
                    </tr>\n\
                    <% } %>\n\
                </tbody>\n\
            </table>\n\
            <!--</div>-->\n\
        </div>\n\
        <% } %>\n\
        \n\
        </li>\n\
    </ul>\n\
    \n\
    <!-- Flamp -->\n\
    <% if (firm.allow_reviewing && firm.show_flamp_link == 1) { %>\n\
    <ul class="dg-map-firm-box">\n\
    <li class="dg-map-firm-row dg-map-flamp-row">\n\
    <a target="_blank" class="dg-map-firm-link-with-icon" href="<%=flampUrl%>">\n\
        <span class="link-icon dg-map-icon dg-map-icon-flamp"></span>\n\
        <% if (firm.info && firm.info.reviewscount) { %>\n\
        <span class="dg-map-firm-link-text"><%=schedule.msg("reviews_on_flamp")%></span>\n\
        <% } else { %>\n\
        <span class="dg-map-firm-link-text"><%=schedule.msg("write_review_on_flamp")%></span>\n\
        <% } %>\n\
    </a>\n\
    <% if (firm.info && firm.info.reviewscount) { %>\n\
    <sup><%=firm.info.reviewscount%></sup>\n\
    <% } %>\n\
    </li>\n\
    </ul>\n\
    <% } %>\n\
    \n\
    \n\
    <!-- Company payment methods -->\n\
    <%if (firm.profile) { %>\n\
    <% var count_pay = 0; %>\n\
    <ul class="dg-map-firm-box dg-map-firm-payments">\n\
        <li class="dg-map-firm-row">\n\
            <%for (var t = 0, pays = payMethods.length; t < pays; t++) { %>\n\
            <% var payM = payMethods[t]; %>\n\
            <%if (firm.profile["pay_"+payM]) { %>\n\
                <%if (count_pay < 1) { %>\n\
                <span class="dg-map-label"><%=schedule.msgU("payment")%></span>\n\
                <%}%>\n\
            <span class="dg-map-icon-pay dg-map-icon-pay-<%=payM%>" title="<%=schedule.msgU("pay_"+payM)%>"></span>\n\
            <% count_pay++; %>\n\
            <%}%>\n\
            <%}%>\n\
        </li>\n\
    </ul>\n\
    <% } %>\n\
    \n\
</div>\n';