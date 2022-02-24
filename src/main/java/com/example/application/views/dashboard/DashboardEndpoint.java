package com.example.application.views.dashboard;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import java.util.Arrays;
import java.util.List;

/**
 * The endpoint for the client-side Dashboard View.
 */
@Endpoint
@AnonymousAllowed
public class DashboardEndpoint {

    @Nonnull
    public List<@Nonnull ServiceHealth> serviceHealthItems() {
        return Arrays.asList(new ServiceHealth(ServiceHealth.Status.EXCELLENT, "Münster", 324, 1540),
                new ServiceHealth(ServiceHealth.Status.OK, "Cluj-Napoca", 311, 1320),
                new ServiceHealth(ServiceHealth.Status.FAILING, "Ciudad Victoria", 300, 1219));
    }

    @Nonnull
    public List<@Nonnull ChartSeries> viewEventsSeries() {
        return Arrays.asList(new ChartSeries("Berlin", 189, 191, 191, 196, 201, 203, 209, 212, 229, 242, 244, 247),
                new ChartSeries("London", 138, 146, 148, 148, 152, 153, 163, 173, 178, 179, 185, 187),
                new ChartSeries("New York", 65, 65, 66, 71, 93, 102, 108, 117, 127, 129, 135, 136),
                new ChartSeries("Tokyo", 0, 11, 17, 23, 30, 42, 48, 49, 52, 54, 58, 62));
    }

    @Nonnull
    public List<@Nonnull PieSeries> responseTimesSeries() {
        return Arrays.asList(new PieSeries("System 1", 12.5), new PieSeries("System 2", 12.5),
                new PieSeries("System 3", 12.5), new PieSeries("System 4", 12.5), new PieSeries("System 5", 12.5),
                new PieSeries("System 6", 12.5));
    }
}
