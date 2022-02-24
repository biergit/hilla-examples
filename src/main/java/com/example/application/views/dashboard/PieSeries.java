package com.example.application.views.dashboard;

import dev.hilla.Nonnull;

/**
 * Simple DTO class for chart data-series.
 */
public class PieSeries {

    @Nonnull
    private String name;
    @Nonnull
    private double y;

    public PieSeries(String name, double y) {
        this.name = name;
        this.y = y;
    }

    public String getName() {
        return name;
    }

    public double getY() {
        return y;
    }
}
