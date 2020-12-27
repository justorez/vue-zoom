export function getDistance(touches) {
    return Math.sqrt(
        Math.abs(
            (touches[0].clientX - touches[1].clientX) *
                (touches[0].clientY - touches[1].clientY)
        )
    );
}

/**
 * 如果 num 在区间中，返回自身；否则返回下限或上限
 */
export function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

export function stopPropagation(event) {
    event.stopPropagation();
}

export function preventDefault(event, isStopPropagation) {
    if (typeof event.cancelable !== "boolean" || event.cancelable) {
        event.preventDefault();
    }

    if (isStopPropagation) {
        stopPropagation(event);
    }
}
