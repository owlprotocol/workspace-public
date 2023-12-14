/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// TODO fix the import
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { DocumentReference, DocumentSnapshot, DocumentData } from "../interfaces.js";
import { fromRef } from "../fromRef.js";

export function doc<T = DocumentData>(ref: DocumentReference<T>): Observable<DocumentSnapshot<T>> {
    return fromRef(ref);
}

/**
 * Returns a stream of a document, mapped to its data payload and optionally the document ID
 * @param query
 * @param options
 */
export function docData<T = DocumentData, R extends T = T>(
    ref: DocumentReference<T>,
    options: {
        idField?: keyof R;
    } = {},
): Observable<T | R | undefined> {
    return doc(ref).pipe(map((snap) => snapToData(snap, options)));
}

export function snapToData<T = DocumentData, R extends T = T>(
    snapshot: DocumentSnapshot<T>,
    options: {
        idField?: keyof R;
    } = {},
): T | R | undefined {
    const data = snapshot.data();

    // match the behavior of the JS SDK when the snapshot doesn't exist
    // it's possible with data converters too that the user didn't return an object
    if (!snapshot.exists || typeof data !== "object" || data === null || !options.idField) {
        return data;
    }

    return {
        ...data,
        [options.idField]: snapshot.id,
    };
}